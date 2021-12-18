const { ipcRenderer } = require('electron')
const { $ } = require('../common/helper')
const path = require('path')
const DataStore = require('../common/dataStore')

const store = new DataStore({ name: 'musicData' })
let filePaths = []

$('#select-file-button').addEventListener('click', async () => {
  const result = await ipcRenderer.invoke('select-file')
  filePaths = result.filePaths

  if (filePaths && filePaths.length) {
    const html = filePaths.reduce((html, file) => {
      html += `<li class="list-group-item">${path.basename(file)}</li>`
      return html
    }, '')
  
    $('#music-list').innerHTML = html
  }
})

$('#import-file-button').addEventListener('click', () => {
  store.addList(filePaths)

  ipcRenderer.send('render-imported-music')
  
  ipcRenderer.send('close-add-music-window')
})