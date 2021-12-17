const { BrowserWindow } = require('electron')

module.exports = class AppWindow extends BrowserWindow {
  constructor(config, filePath) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
      show: false
    }
    const finalConfig = { ...basicConfig, ...config }

    super(finalConfig)

    this.loadFile(filePath)

    // 当页面已经渲染完成后，展示窗口（防止页面产生白屏）
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}