const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { createFiles } = require('./files')

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 700,
    minWidth: 400,
    minHeight: 700,
    autoHideMenuBar: true,
    maximizable: false,
    frame: true,
    icon: 'spotifyobs.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }

  })

  win.loadFile('index.html')
  //comando pra abrir o console ao iniciar: win.webContents.openDevTools(); 
  
}


app.whenReady().then(() => {
  createFiles()
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

if (isDev) {
  console.log('Running in development');
} else {
  console.log('Running in production');
}