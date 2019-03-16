const playBtn = document.querySelector('#mainpage-play-btn');
const songOut = document.querySelector('#audio-output');
const songTitle = document.querySelector('#song-title');
const songAuthor = document.querySelector('#song-author');
const songDescription = document.querySelector('#desc-box');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

var isAudioPlaying = false;

var currentSongIndex = 0;

document.querySelector('#logout-btn').addEventListener('click', () => {
    logoutUser()
    window.location.replace("./home.html");
})



// function getAudioLink() {
//     var storage = storageRef.child(songList[currentSongIndex].path);
//     storage.getDownloadURL().then( url => {
//         return url
//     })
// }

//function latestSongs(howMuch) {
    var a = [];
    firebase.firestore().collection("uploadedAudio").orderBy("createdOn", "desc").limit(10).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            a.push(doc.data()) 
        });
        songList = a
        songTitle.innerHTML = songList[currentSongIndex].title
        songAuthor.innerHTML = songList[currentSongIndex].authorName
        songDescription.innerHTML = '"' + songList[currentSongIndex].description + '"'
        var starsRef = storageRef.child(songList[currentSongIndex].path);
        starsRef.getDownloadURL().then( url => {
            songOut.src = url
        })
//}
    });
    

//var songList = latestSongs(10);


prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
playBtn.addEventListener('click', playSong)


function nextSong() {
    if ( currentSongIndex == songList.length-1) return
    playBtn.innerHTML = "PLAY"
    currentSongIndex++;
    songTitle.innerHTML = songList[currentSongIndex].title
    songAuthor.innerHTML = songList[currentSongIndex].authorName
    songDescription.innerHTML = '"' + songList[currentSongIndex].description + '"'
    var starsRef = storageRef.child(songList[currentSongIndex].path);
    nextBtn.disabled = true;
    prevBtn.disabled = true;
    starsRef.getDownloadURL().then( url => {
        songOut.src = url
        nextBtn.disabled = false;
        prevBtn.disabled = false;
    })
    //songOut.src = getAudioLink();
}

function prevSong() {
    if ( currentSongIndex == 0 ) return
    playBtn.innerHTML = "PLAY"
    currentSongIndex--;
    songTitle.innerHTML = songList[currentSongIndex].title
    songAuthor.innerHTML = songList[currentSongIndex].authorName
    songDescription.innerHTML = '"' + songList[currentSongIndex].description + '"'
    var starsRef = storageRef.child(songList[currentSongIndex].path);
    starsRef.getDownloadURL().then( url => {
        songOut.src = url
        nextBtn.disabled = false;
        prevBtn.disabled = false;
    })
}   

function playSong() {
    if ( isAudioPlaying == false ) {
        songOut.play()
        playBtn.innerHTML = ''
        playBtn.innerHTML = "STOP"
        isAudioPlaying = true;
    } else {
        songOut.pause()
        playBtn.innerHTML = ''
        playBtn.innerHTML = "PLAY"
        isAudioPlaying = false;
    }
}


songOut.onended = function() {
    playBtn.innerHTML = "PLAY"
    isAudioPlaying = false;
}