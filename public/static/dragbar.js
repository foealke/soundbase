const close = document.getElementById('close')
const maximize = document.getElementById('maximize')
const minimize = document.getElementById('minimize')
const {BrowserWindow} = require('electron').remote

minimize.addEventListener("click", (e) => {
        console.log('AB')
        var window = BrowserWindow.getFocusedWindow();
        window.minimize();
});

maximize.addEventListener("click", (e) => {
    console.log('A')
    var window = BrowserWindow.getFocusedWindow();
    if(window.isMaximized()){
        window.unmaximize();
    }else{
        window.maximize();
    }
});
close.addEventListener("click", (e) => {
    console.log('AC')
    var window = BrowserWindow.getFocusedWindow();
    window.close();
});

require('electron').remote.getCurrentWindow().on('close', () => {
    logoutUser()
})