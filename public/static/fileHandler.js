const uploadInputMusic = document.querySelector('#uploadMusic');
const audiopreview = document.querySelector('#audio-preview');
const audioPreviewCore = document.querySelector('#audio-preview-core');
const previewBtn = document.querySelector('#start-preview-btn')

var isAudioPlaying = false;
var selectedFile;
var fileUrl;
var fileBlob;
var description;
var title;

uploadInputMusic.addEventListener('change', updateFile)



function updateFile() {
    if ( uploadInputMusic.files[0].name.split(".")[1] != 'mp3' && uploadInputMusic.files[0].name.split(".")[1] != 'MP3') {
        console.log(uploadInputMusic.files[0].name.split(".")[1])
        uploadInputMusic.value = "";
        document.querySelector('#upload-label').innerHTML = "<b> Dozwolone są tylko pliki mp3! <b>"
        return
    }
    previewBtn.innerHTML = "START"
    selectedFile = uploadInputMusic.files[0];
    console.log(selectedFile)
    document.querySelector('#upload-label').innerHTML =  "Wybrano plik: <b>" + selectedFile.name + "<b>"
    document.querySelector('#upload-description').hidden = false;
    document.querySelector('#upload-title').hidden = false;
    document.querySelector('#upload-button').hidden = false;
    var reader = new FileReader();
    fileUrl = URL.createObjectURL(selectedFile)
    audioPreviewCore.src = fileUrl
    audiopreview.hidden = false
    console.log(typeof(selectedFile))
    console.log(fileUrl)
    console.log(firebase.auth().currentUser)
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

previewBtn.addEventListener('click', playPreview)



function playPreview() {
    if ( isAudioPlaying == false ) {
        audioPreviewCore.play()
        previewBtn.innerHTML = ''
        previewBtn.innerHTML = "STOP"
        isAudioPlaying = true;
    } else {
        audioPreviewCore.pause()
        previewBtn.innerHTML = ''
        previewBtn.innerHTML = "START"
        isAudioPlaying = false;
    }
}

audioPreviewCore.addEventListener('ended', () => {
    previewBtn.innerHTML = "START"
    isAudioPlaying = false;
})

document.querySelector('#upload-button').addEventListener('click', () => {
    description = document.querySelector('#upload-description').value
    title = document.querySelector('#title-input').value
    author = firebase.auth().currentUser.email;
    if (title == "") { 
        title = "No title"
    } 
    if ( description == "") {
        description = "No description"
    }
    uploadAudioFile(selectedFile, description, title, author)
});

function hideUploadElements() {
    document.querySelector('#audio-preview').hidden = true;
    document.querySelector('#upload-description').hidden = true;
    document.querySelector('#upload-title').hidden = true;
    document.querySelector('#upload-button').hidden = true;
    document.querySelector('#browse-btn').hidden = true;

    document.querySelector('#upload-progress').hidden = false;
    document.querySelector('#share-msg').innerHTML = "Poczekaj chwile... <br> wysyłamy twój plik"
    
}