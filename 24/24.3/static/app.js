document.querySelector('#submit-cupcake').addEventListener('click', async function(e){
    e.preventDefault()
    if(typeof(parseInt($('#rating').val())) != 'number'){
        alert('Rating must be a valid number')
        return;
    }
    data = {
        flavor: $('#flavor').val(),
        size: $('#size').val(),
        rating: $('#rating').val(),
        image: $('#image').val()
    }
    try{
        await axios.post('/api/cupcakes', data)
    } catch {
        alert('There was a problem on our end. Please Try again.')
        return
    }
    addCupcakeMarkup(data)
    $('#flavor').val(''),
    $('#size').val(''),
    $('#rating').val(''),
    $('#image').val('')
})

//Delete button is a WIP
//Adds the markup to the page after a cupcake has been submitted
async function addCupcakeMarkup(data){
    if(data.image === ''){
        data.image = 'https://tinyurl.com/demo-cupcake'
    }
    $('#cupcake-list').append(`
        <div id='${data.flavor}' class='container mb-5'>
        <h2 class='m-0 mb-2 text-center'>${data.flavor}</h2>
        <hr class='m-0 mb-3'>
        <div class='container d-flex flex-row align-items-center'>
            <div class='container d-flex flex-column align-items-center'>
                <p>Size: ${data.size}</p>
                <p>Rating: ${data.rating}</p>
                <button id='remove-cupcake'
                class='btn btn-danger btn-sm d-block mb-1'
                /> Remove Cupcake</button>
                <a href="/api/cupcakes/${data.id}" 
                class='d-block btn btn-info btn-sm mt-1'>Details</a>
            </div>
            <div class='container-lg'>
                <img class='img-fluid' src="${data.image}" alt="Image of ${data.name} cupcake">
            </div>
        </div>
    </div>`)
    // $(`#${data.flavor}`).on('click', function(e){
    //     if(e.target.id === 'remove-cupcake'){
    //         $(`#${data.flavor}`).remove()
    //     }
    // })
}

