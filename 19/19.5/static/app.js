const subBtn = document.querySelector('#submit-button')
const resetBtn = document.querySelector('#reset')
const $startBtn = $('#start-btn')
const guessRes = document.querySelector('#guess-response')
const scoreDisplay = document.querySelector('#score')
const highScoreDisplay = document.querySelector('#high-score')
const $guess = $('#guess')
const $guessList = $('#words-guessed')
const timerDisplay = document.querySelector('#timer')
const guessContainer = document.querySelector('#guess-container')

class BoggleGame {
    constructor(timer, score, wordsGuessed) {
        this.timer = timer;
        this.score = 0
        this.wordsGuessed = [];
    }

    //checks for valid word and lets the user know the results of the check
    async checkForValidWord(){
        $guess.focus()
        console.log(this)
        let word = ($guess.val()).toLowerCase()
        if(this.checkGuessedWords(word)){
            guessRes.innerText = `you've already guessed that word`;
            $guess.val('')
            return;
        }
        if(word.length < 2){
            guessRes.innerText = `your guess must be at least 2 characters long`;
            $guess.val('')
            return;
        }
        let res = await axios.get(`/get-word/${word}`)
        let results = res.data.results
        word = res.data.word
        this.showResults(results, word)
        $guess.val('')
    }
    
    //checks the list of already guessed words
    checkGuessedWords(guess){
        for(let word of this.wordsGuessed){
            if(word === guess){
                return true;
            } 
        }
    }

    //shows results to user on front-end
    showResults(results, word){
        this.wordsGuessList(word, results)
        if(results === 'ok'){
            guessRes.innerText = `${word} is on the board, good job!`;
            this.resultsPost(word)
        } else if (results === 'not-on-board'){
            guessRes.innerText = `${word} is not on the board`
        } else {
            guessRes.innerText = `${word} is not a word`
        }
    }

    //changes the score
    resultsPost(word){
        this.score += word.length;
        scoreDisplay.innerText = `Score: ${this.score}`
    }

    //adds word to guessed words list
    wordsGuessList(word, results){
        let $newLi = $(`<li>${word}</li>`)
        if(results === 'ok'){
            this.wordsGuessed.push(word)
            $newLi.toggleClass('correct')
        } else if (results === 'not-on-board'){
            $newLi.toggleClass('not-on-board')
        } else {
            $newLi.toggleClass('not-a-word')
        }
        $guessList.append($newLi)
        guessContainer.scrollTop = guessContainer.scrollHeight;
    }

    //starts the game/timer and adds event listeners to start and restart buttons
    startGame(){
        $startBtn.remove()
        $guess.focus()
        subBtn.addEventListener('click', this.checkForValidWordBinded)
        resetBtn.addEventListener('click', () => location.reload())
        this.startTimer()
    }

    //starts the timer
    startTimer(){
        let countdown = setInterval(() => {
            this.timer--;
            timerDisplay.innerText = `Time left: ${this.timer}`;
            if(this.timer === 0){
                this.endOfGame(countdown)
            }
        }, 1000)
    }

    //posts high score to server and updates front end
    async endOfGame(interval){
        clearInterval(interval)
        subBtn.removeEventListener('click', this.checkForValidWordBinded)
        const response = await axios.post(`/update-score?score=${this.score}`)
        if(this.score > response.data.previous_high_score){
            guessRes.innerHTML = '<h2>OUT OF TIME! NEW HIGH SCORE!</h2>'
        } else {
            guessRes.innerHTML = '<h2>OUT OF TIME!</h2>'
        }
        $guess.val('')
    }
    
    async checkForValidWordBinded(){
        return await boggleGame.checkForValidWord()
    }

}

let boggleGame = new BoggleGame(60)

//adds event listener to the start button
$startBtn.click(boggleGame.startGame.bind(boggleGame))