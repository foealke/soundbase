// QuerySelectors

const loginbtn = document.querySelector('#login-btn') // Login button
const regbtn = document.querySelector('#register-btn') //Register button
const regname = document.querySelector('#register-name')
const regpassword = document.querySelector('#register-password')
const regerr = document.querySelector('#register-error')
const loginerr = document.querySelector('#login-error')
const loginname = document.querySelector('#login-name')
const loginpassword = document.querySelector('#login-password')
const logoutbtn = document.querySelector('#logout-href')
const createBtn = document.querySelector('#create')
const nickname = document.querySelector('#register-nickname')

// FUNCTIONS

function animateCss(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}