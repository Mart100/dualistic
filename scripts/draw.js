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
        for(let x=0; x < game.tiles.bounds.x; x++) {
            if(getCanvasPos(x-game.camera.x) < getCanvasPos(-1) || getCanvasPos(x-game.camera.x) > window.innerWidth) continue
            for(let y=0; y < game.tiles.bounds.y; y++) {
                if(getCanvasPos(y-game.camera.y) < getCanvasPos(-1) || getCanvasPos(y-game.camera.y) > window.innerHeight) continue
                
                //ctx.strokeRect(getCanvasPos(x-game.camera.x), getCanvasPos(y-game.camera.y), getCanvasPos(1), getCanvasPos(1))
                // draw grass
                let grassImage = sprites[game.world].grass[game.animationCount % 2]
                ctx.drawImage(grassImage, getCanvasPos(x-game.camera.x), getCanvasPos(y-game.camera.y))
                let tile = game.tiles[game.world].find((t) => t.x == x && t.y == y)
                if( tile != undefined) {
                    if(tile != undefined) {
                        switch(tile.type) {
                            case('lamp'): {
                                if(tile.active) ctx.drawImage(sprites[game.world].blocks.lamp[0], getCanvasPos(x-game.camera.x), getCanvasPos(y-game.camera.y))
                                else ctx.drawImage(sprites[game.world].blocks.lamp[1], getCanvasPos(x-game.camera.x), getCanvasPos(y-game.camera.y))
                                break;
                            }
                            case('button'): {
                                if(tile.active) ctx.drawImage(sprites[game.world].blocks.button[1], getCanvasPos(x-game.camera.x), getCanvasPos(y-game.camera.y))
                                else ctx.drawImage(sprites[game.world].blocks.button[0], getCanvasPos(x-game.camera.x), getCanvasPos(y-game.camera.y))
                                break;
                            }                                            
                        }
                    }
                } 
            }
        }
    },
    player: function() {
        ctx.save()
        // image position
        let imagePos = {
            x: getCanvasPos(game.players[game.world].x-game.camera.x)-getCanvasPos(1)/2,
            y: getCanvasPos(game.players[game.world].y-game.camera.y)-getCanvasPos(1)/2
        }

        // get the right image
        let image
        if(game.facing == 'east' || game.facing == 'west') image = sprites[game.world].player.still.side[game.animationCount % 2]
        if(game.facing == 'north') image = sprites[game.world].player.still.back[game.animationCount % 2]
        if(game.facing == 'west') {
            ctx.scale(-1, 1)
            imagePos.x *= -1
            imagePos.x -= getCanvasPos(1)
        }
        if(game.facing == 'south') image = sprites[game.world].player.still.front[game.animationCount % 2]        

        ctx.drawImage(image, imagePos.x, imagePos.y)
        ctx.restore()
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