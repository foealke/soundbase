regbtn.addEventListener('click', () => {
    regerr.innerHTML = ''
    if ( regname.value == '' || regpassword.value == '') {
        regerr.innerHTML = 'Uzupełnij oba pola!'
        animateCss('#register-error','shake')
        
    }
});

