let deckId;
const cardsRemaining = document.getElementById('cards-left');
const drawButton = document.getElementById('draw-card-btn');
const drawButtonText = document.getElementById('draw-btn-text');
const resetBtn = document.getElementById('reset-btn');

newDeck();

drawButton.addEventListener('click', e => {
    if(drawButtonText.innerText === 'Draw Card'){
        drawCard()
    } else if (drawButtonText.innerText === 'New Deck'){
        newDeck();
    };
});

resetBtn.addEventListener('click', e => {
    newDeck();
});

function getRequest(url){
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        request.onload = function () {
            if (request.readyState !== 4) return

            if (request.status >= 200 && request.status < 300){
                resolve(JSON.parse(request.response));
            } else {
                reject(request.status);
            };
        };
        request.onerror = function(handleError){
            reject('Network Error!');
        };
        request.open('GET', url);
        request.send();
    });
};

function newDeck(){
    $('#card-display').empty();
    document.getElementById('draw-btn-text').innerText = 'Draw Card';
    getRequest('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        if(res.success){
            deckId = res.deck_id;
            cardsRemaining.innerText = 52;
        };
    })
    .catch(err => {
        console.log(err);
    });
};

function drawCard(){
    getRequest(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(res => {
        if(res.remaining === 0){
            readyForNewDeck();
        } else {
            addCardToDom(res);
            cardsRemaining.innerText = res.remaining;
        };
    })
    .catch(err => {
        console.log(err);
    });
};


function addCardToDom(resp){
    $('#card-display').append(`
    <img id='${resp.cards[0].code}' class='card bg-success' src='${resp.cards[0].image}'>
    `);
    let card = document.getElementById(`${resp.cards[0].code}`);
    let lean = Math.floor(Math.random() * 2);
    if(lean === 0){
        card.style.transform = `rotate(${Math.floor(Math.random() * 31)}deg) translate(-50%, -50%)`;
    } else {
        card.style.transform = `rotate(-${Math.floor(Math.random() * 31)}deg) translate(-50%, -50%)`;
    };
};

function readyForNewDeck(){
    drawButtonText.innerText = 'New Deck';
    cardsRemaining.innerText = 0;
};