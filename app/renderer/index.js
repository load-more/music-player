const { ipcRenderer } = require('electron')
const { $ } = require('../common/helper')

$('#add-music-button').addEventListener('click', () => {
  ipcRenderer.send('add-music')
})