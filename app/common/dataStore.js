const Store = require('electron-store')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

module.exports = class DataStore extends Store {
  constructor(config) {
    super(config)
  }
  getList() {
    return this.get('musicData') || []
  }
  addList(items) {
    if (!items) return
    if (Array.isArray(items)) {
      const list = this.getList()
      const newList = items.map(item => {
        return {
          id: uuidv4(), // 生成唯一标识 id
          filePath: item,
          fileName: path.basename(item)
        }
      }).filter(item => { // 去重
        for (let i of list) {
          if (i.filePath === item.filePath) return false
        }
        return true
      })
      this.set('musicData', [ ...list, ...newList ])
    }
  }
  find(id) {
    const list = this.getList()
    return list.find(item => item.id === id)
  }
  remove(id) {
    const list = this.getList()
    const newList = list.filter(item => item.id !== id)
    this.set('musicData', newList)
  }
}