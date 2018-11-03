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
    // document.onclick = function (argument) {
    //     toggleFullScreen()
    //     console.log('yeet')
    // }
    // prepare canvas
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    game.loadLevel(levels[0])
    // start frame
    frame()
    setInterval(() => { tick() }, 10)
})
function toggleFullScreen() {
    let docelem = document.documentElement;
    if(docelem.requestFullscreen) {
        docelem.requestFullscreen();
    }
    else if(docelem.mozRequestFullScreen) {
        docelem.mozRequestFullScreen();
    }
    else if(docelem.webkitRequestFullScreen) {
        docelem.webkitRequestFullScreen();
    }
    else if(docelem.msRequestFullscreen) {
        docelem.msRequestFullscreen();
    }
}