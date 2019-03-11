

regbtn.addEventListener('click', () => {
    let email = regname.value;
    let password = regpassword.value;
    let name = nickname.value;
    if ( email == '' || password == '' || name == '') {
        return
    }
    registerNewUser(name, email, password)
})
