console.log("Let's get this party started!");
//search term
const searchTerm = document.getElementById('gif-search');
//search button
const searchBtn = document.querySelector('#search-btn ');
//remove images button
const removeBtn = document.querySelector('#remove-btn ');

//adds eventlistener to the search button and sends the search value to the api call
searchBtn.addEventListener('click', e => {
    e.preventDefault();

    //prevents null API call
    if (searchTerm.value === ''){
        const nullSearch = new Error('No Search Term Entered', {cause: 'null search'});
        alert('Please enter a search term');
        throw nullSearch;
    }
    giphyAPI(searchTerm.value);
});

//removes all imgs from #gif-holder
removeBtn.addEventListener('click', e => {
    e.preventDefault();
    let imgs = document.querySelectorAll('.gif-holder img');
    for(let img of imgs){
        img.remove();
    }
})

//API call
async function giphyAPI(input) {
    //retrieve search query from API
    const response = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${input}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);
    console.log(response);
    appendGif(response);
}

//creates new image from API response and appends it
function appendGif(res){
    let newGif = document.createElement('img');
    let randomNum = Math.floor(Math.random() * 50);
    try {
        if (res.data.data.length > 0) {
            newGif.src = res.data.data[randomNum].images.fixed_width.url;
            document.querySelector('.gif-holder').append(newGif);
            // searchTerm.value = '';
        } else if(res.data.data.length === 0){
            const noRes = new Error('No results found', { cause: 'no results'});
            throw noRes;
        }
    } catch (e) {
        if(e.cause === 'null search'){
            alert('Please enter a search term');
        }
        if(e.cause === 'no results'){
            alert('No gifs found')
        }
    }
}