function frame() {
    requestAnimationFrame(frame)
    draw.grid()

    // clear screen
    //ctx.clearRect(0, 0, canvas.width, canvas.height)
}


const draw = {
    grid: function() {
        for(let x=0; x < window.innerWidth; x++) {
            for(let y=0; y < window.innerHeight; y++) {
                ctx.fillRect(x*game.pixelSize, y*game.pixelSize, game.pixelSize, game.pixelSize)
            }
        }
    }
}

function getRandomInt(min, max) {
  min = Math.round(min);
  max = Math.round(max);
  return Math.round(Math.random() * (max - min)) + min
}