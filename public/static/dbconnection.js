function generateUniqueID() {
    var d = new Date().valueOf().toString();
    return d
}

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

var uid;
var id;

function registerNewUser(name, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then( res => { 
        console.log(res); 
        user = firebase.auth().currentUser; 
        uid = firebase.auth().currentUser.uid
        id = generateUniqueID()
    }).then( () => { 
        
        firebase.auth().currentUser.updateProfile({
            displayName: name
        }).then( () => {
            firebase.firestore().collection('users').doc(uid).set({
                displayName: name,
                uid: uid,
                id: id,
                email: email,
                points: 0,
            }).then( () => { redirectToApp() } )            
        })
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('An error has occured! ['+errorCode+']: ' + errorMessage)
        registerError(errorCode)
    });
}

function loginUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then( res => { 
        console.log(res); 
        user = firebase.auth().currentUser; 
    }).then( () => { redirectToApp() }).catch(function(error) {
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

var storage = firebase.storage();
var storageRef = storage.ref();
var metadata = {
    contentType: 'audio/mp3'
};
var customMetaData = {};
var uploadTask;
var metadata = {}


function uploadAudioFile(file, description, title, author, length) {
    var id = generateUniqueID()
    metadata = {
        customMetadata: {
          'title': title,
          'description': description,
          'author': author
        }
      }
    hideUploadElements();
    uploadTask = firebase.storage().ref('audio/' + id).put(file, metadata);
    uploadTask.then(function(snapshot) {
        console.log('Uploaded a blob or file!' + snapshot);
    });
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.querySelector('#upload-progress-bar').style.width = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toString() + "%"
        document.querySelector('#upload-progress-bar').innerHTML = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toString() + "%"
        console.log('Upload is ' + progress + '% done');
        if ( Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100) >= 100) {
            addSongToDB(description, title, author, 'audio/' + id, id, firebase.auth().currentUser.uid, length, firebase.auth().currentUser.displayName)
            Swal.fire(
                'Świetnie!',
                'Wysyłanie twojego pliku zostało zakończone!',
                'success'
            ).then( () => {
                window.location.replace("./userProfile.html");
            })
        }
    })
}

function addSongToDB(description, title, author, path, id, authorID, length, authorName) {
    var idez = generateUniqueID()
    firebase.firestore().collection('uploadedAudio').doc(id).set({
        authorID: authorID,
        description: description,
        title: title,
        author: author,
        path: path,
        length: length,
        authorName: authorName,
        searchTag: title.toLowerCase(),
        createdOn: idez,
        points: 0
    });
    firebase.database().ref('uploadedAudio/'+id).set({
        authorID: authorID,
        description: description,
        title: title,
        author: author,
        path: path,
        length: length,
        authorName: authorName,
        searchTag: title.toLowerCase(),
        createdOn: idez,
        points: 0
    });
}

