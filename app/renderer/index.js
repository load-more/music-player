const { ipcRenderer } = require('electron')
const { $ } = require('../common/helper')
const DataStore = require('../common/dataStore')

const store = new DataStore({ name: 'musicData' })

$('#add-music-button').addEventListener('click', () => {
  ipcRenderer.send('add-music')
})

ipcRenderer.on('render-music-list', () => {
  const list = store.getList()
  console.log(list)
  const html = list.reduce((html, item) => {
    html += `<li class="list-group-item">
    <div class="row">
      <div class="col">
        <i class="iconfont icon-yinle"></i>
      </div>
      <div class="col-9">
        ${item.fileName}
      </div>
      <div class="col">
        <i class="iconfont icon-play"></i>
        <i class="iconfont icon-delete-fill"></i>
      </div>
    </div>
    </li>`
    return html
  }, '')
  $('#music-list').innerHTML = html
})