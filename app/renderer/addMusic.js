const { ipcRenderer } = require('electron')
const { $ } = require('../common/helper')
const path = require('path')

$('#select-file-button').addEventListener('click', async () => {
  const reuslt = await ipcRenderer.invoke('select-file')

  const html = reuslt.filePaths.reduce((html, file) => {
    html += `<li class="list-group-item">${path.basename(file)}</li>`
    return html
  }, '')

  $('#music-list').innerHTML = html
})