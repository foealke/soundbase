loginbtn.addEventListener('click', () => {
    console.log('ww')
    loginerr.innerHTML = ''
    if ( loginname.value == '' || loginpassword.value == '') {
        loginerr.innerHTML = 'Uzupełnij wszystkie pola!'
        animateCss('#login-error','shake')
        
    }
});