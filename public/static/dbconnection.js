var user;

var config = {
    apiKey: "AIzaSyCFOujayYP6VpegOW6Ok6q-JyY9SZlsNM4",
    authDomain: "audiobase-5c02a.firebaseapp.com",
    databaseURL: "https://audiobase-5c02a.firebaseio.com",
    projectId: "audiobase-5c02a",
    storageBucket: "audiobase-5c02a.appspot.com",
    messagingSenderId: "31781202721"
  };

firebase.initializeApp(config);

function redirectToApp() {
    if ( user != undefined) {
        window.location.replace("./userProfile.html");
    }
}

function errorTranslate(errCode) {
    switch (errCode) {
        case 'auth/user-disabled':
            return 'Ten użytkownik został zablokowany ! :('
            break;
        case 'auth/invalid-email':
            return 'Nie poprawny adres e-mail!'
            break
        case 'auth/invalid-password':
            return 'Nie poprawne hasło!'
            break
        case 'auth/user-not-found':
            return 'Nie ma takiego użytkownika!'
            break
        case 'auth/weak-password':
            return 'Hasło jest zbyt słabe!'
            break
        case 'auth/email-already-in-use':
            return 'Email jest już w użyciu!'
            break
        case 'auth/wrong-password':
            return 'Złe hasło'
            break
        default:
            return 'Nie zidentyfikowany bląd o kodzie: <br> '+errCode
            break;
    }
}

function registerError(errCode) {
    regerr.innerHTML = errorTranslate(errCode)
    animateCss('#register-error','shake')
}
function loginError(errCode) {
    loginerr.innerHTML = errorTranslate(errCode)
    animateCss('#login-error','shake')
}

function registerNewUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then( res => { console.log(res); user = firebase.auth().currentUser;}).then( () => { redirectToApp() }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('An error has occured! ['+errorCode+']: ' + errorMessage)
        registerError(errorCode)
      });
}

function loginUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then( res => { console.log(res); user = firebase.auth().currentUser; }).then( () => { redirectToApp() }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('An error has occured! ['+errorCode+']: ' + errorMessage)
        loginError(errorCode)
      });
}

function logoutUser() {
    firebase.auth().signOut().then(function() {
        console.log("[Sign out] User has been logged out")
      }, function(error) {
        console.log('[Sign out] There was an error while signing out ! : ' + error)
      });
}

