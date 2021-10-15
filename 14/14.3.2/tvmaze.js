const episodeList = document.querySelector('#episodes-list');

//adds event listener to the shows list
document.querySelector('#shows-list').addEventListener('click', e =>{
  if(e.target.nodeName === 'BUTTON'){
  getEpisodes(e.target.id);
  }
})

//toggles the visibility of the episodes summary in the episodes list
episodeList.addEventListener('click', e => {
  if(e.target.nodeName === 'BUTTON'){
    e.target.nextSibling.classList.toggle('ep-sum')
  }
})

/** Given a query string, return array of matching shows:
*     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  
  const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
  // console.log(response);
  return response;
}
/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows.data) {
    let showImg;
    if(show.show.image){
      showImg = show.show.image.medium;
    } else if(!show.show.image){
      showImg = 'https://tinyurl.com/tv-missing';
    }
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.show.id}">
         <div class="card" data-show-id="${show.show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.show.name}</h5>
             <img class='showImg' src='${showImg}'>
             <p class="card-text">${show.show.summary}</p>
             <button id="${show.show.id}">Episodes</button>
           </div>
         </div>
       </div>
      `);
    $showsList.append($item);
  }
};


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */
async function getEpisodes(id) {
  const response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  // iterates over response and creates an array of objects of episode information
  console.log(response);
  let episodes = [];
  for(let episode of response.data){
      let obj = {}
      obj.id = episode.id;
      obj.name = episode.name;
      obj.season = episode.season;
      obj.number = episode.number;
      obj.sum = episode.summary;
      episodes.push(obj);
  }
  populateEpisodes(episodes);
}

//creates html elemtns for the episodes list
function populateEpisodes(arr){
  clearEpList();
  for(let episode of arr){
    $('#episodes-list').append(`<li id='ep-${episode.id}' class='li'>${episode.name} (Season: ${episode.season} Episode: ${episode.number}) </li>`);
    $(`#ep-${episode.id}`).append(`<button class='more-btn' id='more-btn'>More</button>`)
    if (episode.sum !== null && episode.sum !== ''){
      $(`#ep-${episode.id}`).append(`<span id='ep-sum-${episode.id}' class='ep-sum'>${episode.sum}</span>`)
    } else if(episode.sum === null || episode.sum === ''){
      $(`#ep-${episode.id}`).append(`<span id='ep-sum-${episode.id}' class='ep-sum'>No summary available</span>`)
    }
  }
  document.querySelector('#episodes-area').style.display = 'block';
}

//cleans any episode list that is present
function clearEpList(){
  let episodeList = document.querySelectorAll('#episodes-list li')
  for(let li of episodeList){
    li.remove();
  }
}

