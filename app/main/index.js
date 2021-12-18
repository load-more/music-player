const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const AppWindow = require('../common/appWindow')
const DataStore = require('../common/dataStore')

// 主进程中必须这一步，否则会报错，参照 electron-store 文档
DataStore.initRenderer()

let mainWindow = null
let addMusicWindow = null

const createWindow = () => {
  const win = new AppWindow({}, path.join(__dirname, '../renderer/index.html'))

  return win
}

const renderMusicList = () => {
  mainWindow.webContents.send('render-music-list')
}

app.on('ready', () => {
  mainWindow = createWindow()

  // 窗口页面加载完成之后，渲染音乐列表
  mainWindow.webContents.on('did-finish-load', () => {
    renderMusicList()
  })

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
  addMusicWindow = new AppWindow({
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

ipcMain.on('render-imported-music', () => {
  renderMusicList()
})

ipcMain.on('close-add-music-window', () => {
  addMusicWindow.close()
})