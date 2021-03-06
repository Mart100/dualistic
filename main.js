// variables
let canvas,ctx
let apollo = {
    pos: {x: 0, y: 0},
    tiles: []
}
let artemis = {
    pos: {x: 0, y: 0},
    tiles: []

}
let currentLevel = 0
// on page load
$(() => {
    // prepare canvas
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false;
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    game.loadLevel(levels[0])
    // start frame
    if(game.world == 'apollo') $('#canvas').css('background-color', '#3C8646') 
    else $('#canvas').css('background-color', '#142D17')
    frame()
    setInterval(() => { tick() }, 10)
})
function toggleFullScreen() {
    let docelem = document.documentElement
    if(docelem.requestFullscreen) docelem.requestFullscreen()
    else if(docelem.mozRequestFullScreen) docelem.mozRequestFullScreen()
    else if(docelem.webkitRequestFullScreen) docelem.webkitRequestFullScreen()
    else if(docelem.msRequestFullscreen) docelem.msRequestFullscreen()
}