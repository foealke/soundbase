

loginbtn.addEventListener('click', () => {
    let email = loginname.value;
    let password = loginpassword.value;
    if ( email == '' || password == '') {
        return
    }
    loginUser(email, password)
})