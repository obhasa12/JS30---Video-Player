// Elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const btnfullscreen = player.querySelector('.fullscreen')

// Functions
function mediaPlay(){
    const status = video.paused? 'play': 'pause'
    video[status]() === 'play'
    video.paused === true? toggle.innerText = '►': toggle.innerText = '❚ ❚'
}
function mediaSkip(){
    video.currentTime += parseFloat(this.dataset.skip)
}
function mediaSettings(){
    video[this.name] = this.value
}
function durationBar(){
    const duration = (video.currentTime/video.duration) * 100
    progressBar.style.flexBasis = `${duration}%`
}
function timeLine(e){
    const timeLine = (e.offsetX/progress.offsetWidth)*video.duration
    video.currentTime = timeLine
}

function fullScreen(){
    document.fullscreenElement? document.exitFullscreen(): player.requestFullscreen()
}

// Events
video.addEventListener('click', mediaPlay)
video.addEventListener('timeupdate', durationBar)
toggle.addEventListener('click', mediaPlay)
skipButtons.forEach(button => button.addEventListener('click', mediaSkip))
ranges.forEach(range => range.addEventListener('change', mediaSettings))
ranges.forEach(range => range.addEventListener('mousemove', mediaSettings))
let lock = false
progress.addEventListener('click', timeLine)
progress.addEventListener('mousemove', (e) => lock && timeLine(e))
progress.addEventListener('mousedown', () => lock = true)
progress.addEventListener('mouseup', () => lock = false)
btnfullscreen.addEventListener('click', fullScreen)





