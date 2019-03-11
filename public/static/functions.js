function startRecording() {
    console.log("recordButton clicked");
 

 
    var constraints = { audio: true, video:false }
 
   
 
    recordButton.disabled = true;
    stopButton.disabled = false;
    pauseButton.disabled = false

 
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
 
      
        gumStream = stream;
 

        input = audioContext.createMediaStreamSource(stream);
 
        
        rec = new Recorder(input,{numChannels:1})
 
    
        rec.record()
 
        console.log("Recording started");
 
    }).catch(function(err) {

        recordButton.disabled = false;
        stopButton.disabled = true;
        pauseButton.disabled = true
    });
}

function pauseRecording(){
    console.log("pauseButton clicked rec.recording=",rec.recording );
    if (rec.recording){
       
        rec.stop();
        pauseButton.innerHTML="Resume";
    }else{
       
        rec.record()
        pauseButton.innerHTML="Pause";
    }
}

function stopRecording() {
    console.log("stopButton clicked");
 
   
    stopButton.disabled = true;
    recordButton.disabled = false;
    pauseButton.disabled = true;
 
    pauseButton.innerHTML="Pause";
 
    rec.stop();
 
    gumStream.getAudioTracks()[0].stop();
 
    rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
 
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');
 
 
    au.controls = true;
    au.src = url;

    link.href = url;
    link.download = new Date().toISOString() + '.wav';
    link.innerHTML = link.download;
 
    li.appendChild(au);
    li.appendChild(link);
 
    recordingsList.appendChild(li);
}