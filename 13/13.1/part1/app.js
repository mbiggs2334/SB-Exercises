//1. console logs once the page is fully loaded
$(window).on('load', function(){
    console.log("Let's get ready to party with jQuery!");
});

//2. giving all images inside an article tag the class of 'image-center'
$('article img').addClass('image-center');

//3. remove the last p in the article
$('article').children('p').last().remove();

//4. make the title font size a random number between 0-100px
let num = Math.floor(Math.random() * 101);
$('#title').css('font-size', num + 'px');

//5. creates and adds an li to the ol
$('<li>').html("I'm actually a cat. Meow").appendTo('ol');

//6. removes the contents of aside and adds a p tag with text
$('aside').children().remove();$('<p>').html('Sorry about that list. They Suck').appendTo('aside');

//7. adds event listener to inputs and grabs values and changes body bg color
$('input').on('change', function(){
    const RGB = new Array($('input').eq(0).val(), $('input').eq(1).val(), $('input').eq(2).val());
    $('body').css('background-color', `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`);
});

//8. adds event listener to image and removes from DOM on click
$('img').click(function(){
    $(this).remove();
});