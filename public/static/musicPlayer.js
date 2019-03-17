const SONG_AUTHOR = document.querySelector('#author');
const SONG_TITLE = document.querySelector('#song-title');
const SONG_DESC = document.querySelector('#song-description');
const SONG_LENGTH = document.querySelector('#song-length');

const play_btn = document.querySelector('#play-btn');
const forward_btn = document.querySelector('#forward-btn');
const backward_btn = document.querySelector('#backward-btn');
const reapet_btn = document.querySelector('#reapet-btn');
const zoom_btn_plus = document.querySelector('#zoom-btn-plus');
const zoom_btn_minus = document.querySelector('#zoom-btn-minus');

const volume_range = document.querySelector('#customRange1')

var data;
var zoom = 50;
var isAudioPlayingMP = false;


var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    scrollParent: true,
    waveColor: '#95238c',
    barHeight: 1,
    responsive: true,
    hideScrollbar: true,
    skipLength: 4
});


function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

var song = localStorage.getItem('songid')
console.log(song)

function loadSong() {
    play_btn.disabled = true;
    reapet_btn.disabled = true;
    forward_btn.disabled = true;
    var songRef = firebase.database().ref('uploadedAudio/' + song);
    songRef.on('value', function(snapshot) {
        console.log(snapshot.val())
        data = snapshot.val()
        SONG_AUTHOR.innerHTML = data.authorName
        SONG_TITLE.innerHTML = data.title
        SONG_DESC.innerHTML = '"' + data.description + '"'
        var songUrlRef = firebase.storage().ref().child(data.path);
        songUrlRef.getDownloadURL().then( url => {
            wavesurfer.load(url)
        })
        SONG_LENGTH.innerHTML = fmtMSS(wavesurfer.getCurrentTime()) + ' / ' + data.length 
    });

}
loadSong()

wavesurfer.on('ready', function() {
    document.querySelector('#loading-spinner').hidden = true;
    play_btn.disabled = false;
    reapet_btn.disabled = false;
    forward_btn.disabled = false;
});

forward_btn.addEventListener('click', () => {
    wavesurfer.skipForward()
});

backward_btn.addEventListener('click', () => {
    wavesurfer.skipBackward()
});

play_btn.addEventListener('click', playSong)

function playSong() {
    if ( isAudioPlayingMP == false ) {
        wavesurfer.play()
        play_btn.style.backgroundImage = "url('./public/imgs/pause.png')"
        isAudioPlayingMP = true;
    } else {
        wavesurfer.pause() 
        play_btn.style.backgroundImage = "url('./public/imgs/play.png')"
        isAudioPlayingMP = false;
    }
}


wavesurfer.on('finish', function() {
    play_btn.style.backgroundImage = "url('./public/imgs/play.png')"
    isAudioPlayingMP = false;
})

reapet_btn.addEventListener('click', function() {
    play_btn.style.backgroundImage = "url('./public/imgs/pause.png')"
    isAudioPlayingMP = true;
    wavesurfer.stop()
    wavesurfer.play()
})

volume_range.addEventListener('input', function() {
    wavesurfer.setVolume(volume_range.value / volume_range.max)
})

zoom_btn_minus.addEventListener('click', function() {
    if ( zoom <= 10 ) {
        zoom_btn_minus.disabled = true
        return
    }
    zoom_btn_plus.disabled = false;
    zoom_btn_minus.disabled = false;
    zoom -= 10
    wavesurfer.zoom(zoom)
    document.querySelector('#pps-info').innerHTML = 'Zoom:' + zoom + 'pps'
})
zoom_btn_plus.addEventListener('click', function() {
    if ( zoom >= 250 ) {
        zoom_btn_plus.disabled = true;
        return
    }
    zoom_btn_minus.disabled = false;
    zoom_btn_plus.disabled = false;
    zoom += 10
    wavesurfer.zoom(zoom)
    document.querySelector('#pps-info').innerHTML = 'Zoom:' + zoom + 'pps'
})

function updateTimer() {
    SONG_LENGTH.innerHTML = fmtMSS(Math.floor(wavesurfer.getCurrentTime())) + ' / ' + data.length 
}

wavesurfer.on('seek',updateTimer)
wavesurfer.on('ready', updateTimer)
wavesurfer.on('audioprocess', updateTimer)