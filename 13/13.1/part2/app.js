$('#submit-btn').on('click', function (e) {
    //prevents page refresh
    e.preventDefault();

    //makes sure the rating is between 1-10
    if ($('#rating').val() > 10 || $('#rating').val() < 0 || $('#rating').val() === '') {
        alert('Your rating must be between 0 and 10');
        return;
    }

    //assures the title is at least 2 characters long
    if ($('#title').val().length < 2) {
        alert('Your title must be at least 2 characters long');
        return;
    }

    //pulls values and adds elements to DOM.
    $('#movies').append($('<p>'));
    $('#movies p').last().append($('<span>', { 'text': `Title: ${$("#title").val()} - Rating: ${$("#rating").val()} ` }));
    $('#movies p span').last().append($('<button>', { 'text': 'Remove' }));

    //adds event listener/removes element from the DOM
    $('div p span button').on('click', function (e) {
        $(this).parent().remove();
    });

    //clears val inputs
    $('#rating').val('');
    $('#title').val('');
});

