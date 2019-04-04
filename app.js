const { app, BrowserWindow } = require('electron')
var path = require('path')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    devTools: true,
    width: 1280,
    height: 720,
    minWidth: 1024, 
    minHeight: 768,
    title: "SoundBase",
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  })


process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

mainWindow.loadFile('./home.html')

mainWindow.setMenu(null);

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
