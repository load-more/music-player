const Store = require('electron-store')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

module.exports = class DataStore extends Store {
  constructor(config) {
    super(config)
  }
  getList() {
    const list = this.get('musicData') || {}
    const result = []
    // 将对象转为数组并返回
    for (let i in list) {
      result.push(list[i])
    }
    return result
  }
  addList(items) {
    if (!items) return
    if (Array.isArray(items)) {
      const list = this.get('musicData') || {}
      const newList = items.map(item => {
        return {
          id: uuidv4(), // 生成唯一标识 id
          filePath: item,
          fileName: path.basename(item)
        }
      }).filter(item => { // 去重
        for (let i in list) {
          if (list[i].id === item.id) return false
        }
        return true
      })
      this.set('musicData', { ...list, ...newList })
    }
  }
}