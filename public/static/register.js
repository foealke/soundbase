

regbtn.addEventListener('click', () => {
    let email = regname.value;
    let password = regpassword.value;
    if ( email == '' || password == '') {
        return
    }
    registerNewUser(email, password)
})
