const { app, BrowserWindow } = require('electron')
const path = require('path')
const AppWindow = require('../common/appWindow')

let mainWindow = null

const createWindow = () => {
  const win = new AppWindow({}, path.join(__dirname, '../renderer/index.html'))

  return win
}

app.on('ready', () => {
  mainWindow = createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})