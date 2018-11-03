function frame() {
    requestAnimationFrame(frame)

    // clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    draw.grid()
    draw.player()

}


const draw = {
    grid: function() {
        if(game.world == 'artemis') {
            
            ctx.strokeStyle = 'black'
            ctx.fillStyle = 'white'
        } else {
            
            ctx.strokeStyle = 'white'
            ctx.fillStyle = 'black'
        }
        //loops over all the grids
        for(let x=0; x < 25; x++) {
            if(getCanvasPos(x-game.camera.x) < getCanvasPos(-1) || getCanvasPos(x-game.camera.x) > window.innerWidth) continue
            for(let y=0; y < 25; y++) {
                if(getCanvasPos(y-game.camera.y) < getCanvasPos(-1) || getCanvasPos(y-game.camera.y) > window.innerHeight) continue
                
                //ctx.rect(getCanvasPos(x-game.camera.x), getCanvasPos(y-game.camera.y), getCanvasPos(1), getCanvasPos(1))
                ctx.fillRect(getCanvasPos(x-game.camera.x), getCanvasPos(y-game.camera.y), getCanvasPos(1), getCanvasPos(1))
                ctx.strokeRect(getCanvasPos(x-game.camera.x), getCanvasPos(y-game.camera.y), getCanvasPos(1), getCanvasPos(1))
            }
        }
    },
    player: function() {
        // get the right image
        let image = game.animations[game.world].player.still.side[game.animationCounter % 2]
        let imagePos = {
            x: getCanvasPos(game.players[game.world].x-game.camera.x)-getCanvasPos(1)/2,
            y: getCanvasPos(game.players[game.world].y-game.camera.y)-getCanvasPos(1)/2
        }
        ctx.drawImage(image, imagePos.x, imagePos.y)
    }
}

function getCanvasPos(a) {
    return a*game.pixelSize*game.pixelInTile

}

function getRandomInt(min, max) {
  min = Math.round(min);
  max = Math.round(max);
  return Math.round(Math.random() * (max - min)) + min
}