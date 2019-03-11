regbtn.addEventListener('click', () => {
    regerr.innerHTML = ''
    if ( regname.value == '' || regpassword.value == '') {
        regerr.innerHTML = 'Uzupełnij wsztstkie pola!'
        animateCss('#register-error','shake')
        
    }
});

