const numberForm = document.getElementById('number-form');
const numberInput = document.getElementById('number');
const fieldType = document.getElementById('field-type');

//Gives warning on how the date search works
fieldType.addEventListener('click', (e) => {
    if(e.target.id === 'date' && document.getElementById('date-warning') !== undefined){
        $('#date-warning-div').append(`<p id="date-warning">The Date category is searched by day of year. Anything over 366 will loop back to the 1st day. EG. 367 will really be searching for the 1st day of the year.</p>`);
    } else {
        $('#date-warning').remove();
    }
});

//Makes request to API
numberForm.addEventListener('submit', e => {
    e.preventDefault();
    factPromises.length = 0;
    let number = numberInput.value;
    let type = document.querySelector('input[name="query-type"]:checked').id;
    for(let i = 0; i < 5; i++){
        factPromises.push(
            get(`http://numbersapi.com/${number}/${type}?json`)
        );
    };
    promiseAll(factPromises);
});

const factPromises = [];

//Get request factory
function get(url){
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        request.onload = function () {
            if (request.readyState !== 4) return;

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

//handles the promise resolves/rejects
function promiseAll(promiseArray){
    Promise.all(promiseArray)
    .then(res => {
        $('#facts-list').empty()
        addToDom(res);
    })
    .catch(err => {
        $('#facts-list').empty()
        $('#facts-list').append('<p class="text-center fs-4">Something went wrong. Please try again later.</p>')
    })
};


//appends the results to the dom
function addToDom(array){
    if(array[0].found){
        $('#chosen-number').text(`${array[0].number}`)
        for(let i = 0; i < array.length; i++){
            $('#facts-list').append(`<li class='list-group-item blue text-light pb-2'>${array[i].text}</li>`);
        };
    } else if(array[0].number === null){
        $('#chosen-number').text()
        $('#facts-list').append(`<li class="list-group-item blue text-light">Looks like we couldn't find anything for that number.</li>`)
    } else {
        $('#chosen-number').text(`${array[0].number}`)
        $('#facts-list').append(`<li class='list-group-item blue text-light'>${array[0].text}</li>`)
    };
}