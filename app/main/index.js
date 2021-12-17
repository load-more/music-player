const { app, BrowserWindow, ipcMain, dialog } = require('electron')
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

ipcMain.on('add-music', () => {
  const addMusicWindow = new AppWindow({
    width: 450,
    height: 400,
    parent: mainWindow
  }, path.join(__dirname, '../renderer/addMusic.html'))
})

ipcMain.handle('select-file', async () => {
  const files = await dialog.showOpenDialog({
    title: '请选择音乐文件',
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: '音乐', extensions: ['mp3'] }
    ]
  })
  return files
})