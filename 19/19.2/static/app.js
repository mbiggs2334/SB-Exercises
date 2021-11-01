inputs = document.querySelectorAll('input');
btn = document.querySelector('#submit-btn');
btn.addEventListener('click', e => {
    for (let input of inputs){
        if(input.value === ''){
            alert('All fields must be filled out')
            e.preventDefault()
            break;
        }
        if(input.value.length < 3){
            alert('Inputs must be at least 3 characters long');
            e.preventDefault();
            break;
        }
    }
})