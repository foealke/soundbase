const playBtn = document.querySelector('#mainpage-play-btn');
const songOut = document.querySelector('#audio-output');
const songTitle = document.querySelector('#song-title');
const songAuthor = document.querySelector('#song-author');
const songDescription = document.querySelector('#desc-box');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const songBar = document.querySelector('#song-len');
const timebar = document.querySelector('#time-progress');

function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

function updateAud() {
    var a = fmtMSS(Math.floor(songOut.currentTime))
    var b = fmtMSS(Math.floor(songOut.duration))
    timebar.innerHTML = a + ' / ' + songList[currentSongIndex].length
    var time = Math.floor(songOut.currentTime / songOut.duration * 100 )
    songBar.style.width = time.toString() + "%"
}



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
        setInterval( updateAud, 1 )
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
        var a = fmtMSS(Math.floor(songOut.currentTime))
        var b = fmtMSS(Math.floor(songOut.duration))
        timebar.innerHTML = a + ' / ' + b
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
        var a = fmtMSS(Math.floor(songOut.currentTime))
        var b = fmtMSS(Math.floor(songOut.duration))
        timebar.innerHTML = a + ' / ' + b
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

// songOut.ontimeupdate = function() {
//     var time = Math.floor(songOut.currentTime / songOut.duration ) 
//     songBar.style.width = time.toString() + "%"
// }

