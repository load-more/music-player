const $ = (str) => {
  return document.querySelector(str)
}

const formatTime = (duration) => {
  const sec = Math.round(duration % 60)
  const minu = Math.floor(duration / 60)
  return `${minu.toString().padStart(2, 0)}:${sec.toString().padStart(2, 0)}`
}

module.exports = {
  $,
  formatTime
}