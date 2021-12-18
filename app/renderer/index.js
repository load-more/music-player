const { ipcRenderer } = require('electron')
const { $, formatTime } = require('../common/helper')
const DataStore = require('../common/dataStore')

const store = new DataStore({ name: 'musicData' })
const audio = new Audio()

let currentFile = null

$('#add-music-button').addEventListener('click', () => {
  ipcRenderer.send('add-music')
})

$('#music-list').addEventListener('click', (event) => {
  event.preventDefault()

  const { dataset, classList } = event.target
  const id = dataset.id // 歌曲 id

  if (!id) return // 如果 id 不存在，说明点击的是其他区域，直接返回
  
  if (classList.contains('icon-play')) { // 如果点击的是“播放”
    currentFile = store.find(id)
    audio.src = currentFile.filePath
    audio.play()
  } else if (classList.contains('icon-pause')) { // 如果点击的是“暂停”
    //
  } else if (classList.contains('icon-delete-fill')) { // 如果点击的是“删除”
    //
  }
})

// 当音频加载完成时，更新播放歌曲信息
audio.addEventListener('loadedmetadata', () => {
  $('#music-title').innerHTML = `正在播放：<strong>${currentFile.fileName}</strong>`
  $('#music-time').innerHTML = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`
})

// 当音频播放时，每秒更新进度
audio.addEventListener('timeupdate', () => {
  $('#music-time').innerHTML = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`
  $('#progress-bar').style.width = `${audio.currentTime / audio.duration * 100}%`
})

ipcRenderer.on('render-music-list', () => {
  const list = store.getList()
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
        <i class="iconfont icon-play" data-id="${item.id}"></i>
        <i class="iconfont icon-delete-fill" data-id="${item.id}"></i>
      </div>
    </div>
    </li>`
    return html
  }, '')
  $('#music-list').innerHTML = html
})