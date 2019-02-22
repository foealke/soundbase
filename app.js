const { app, BrowserWindow } = require('electron')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    transparent:true,
    frame: false,
    width: 1280,
    height: 720,
    minWidth: 1024, 
    minHeight: 768,
    webPreferences: {
      nodeIntegration: true
    }
  })


mainWindow.loadFile('./home.html')

mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})