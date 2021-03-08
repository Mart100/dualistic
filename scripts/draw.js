function frame() {//yo was poppin
    requestAnimationFrame(frame)

    // clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    draw.grid()
    draw.player()
}


const draw = {
    grid: function() {
        //loops over all the grids
        for(let x=0; x < game.tiles.bounds.x; x++) {
            if(getCanvasPos(x-game.camera.x) < getCanvasPos(-1) || getCanvasPos(x-game.camera.x) > window.innerWidth) continue
            for(let y=0; y < game.tiles.bounds.y; y++) {
                if(getCanvasPos(y-game.camera.y) < getCanvasPos(-1) || getCanvasPos(y-game.camera.y) > window.innerHeight) continue
                // draw grass
                draw.grass(x, y)
                // draw grid if levelEditor
                if(game.levelEditor) ctx.strokeRect(getCanvasPos(x-game.camera.x), getCanvasPos(y-game.camera.y), game.pixelSize*game.pixelInTile, game.pixelSize*game.pixelInTile)
            }
        }
        let tiles = game.tiles[game.world]
        tiles.sort((a, b) => game.drawOrder[b.type] - game.drawOrder[a.type] )
        for(let tile of tiles) {
            draw.tile(tile)
        }
    },
    tile: function(tile) {
        let x = tile.x
        let y = tile.y
        ctx.save()
        // get tile and draw it
        let animationLength = sprites[game.world].blocks[tile.type].length
        let tileImage = sprites[game.world].blocks[tile.type][game.animationCount % animationLength]
        let tileImagePos = {x: getCanvasPos(x-game.camera.x), y: getCanvasPos(y-game.camera.y)}
        // exceptions
        switch(tile.type) {
            case('lamp'): {
                tileImage = sprites[game.world].blocks[tile.type][tile.active ? 0 : 1]
                break
            }
            case('button'): {
                tileImage = sprites[game.world].blocks[tile.type][tile.active ? 1 : 0]
                break
            }
            case('portal'): {
                if(tile.color != undefined) ctx.fillStyle = tile.color
                if(tile.facing == 'north') {}
                if(tile.facing == 'east') ctx.fillRect(tileImagePos.x+getCanvasPos(0.218), tileImagePos.y+getCanvasPos(0.218), getCanvasPos(0.53), getCanvasPos(0.56))
                if(tile.facing == 'south') {}
                if(tile.facing == 'west') ctx.fillRect(tileImagePos.x+getCanvasPos(0.248), tileImagePos.y+getCanvasPos(0.218), getCanvasPos(0.53), getCanvasPos(0.56))
                break
            }
        }
        // activation
        if(sprites[game.world].blocks[tile.type].on != undefined) {
            animationLength = sprites[game.world].blocks[tile.type][tile.active ? 'on' : 'off'].length
            tileImage = sprites[game.world].blocks[tile.type][tile.active ? 'on' : 'off'][game.animationCount % animationLength]
        }
        // facing
        if(tile.facing != undefined) {
            ctx.translate(tileImagePos.x+getCanvasPos(1)/2, tileImagePos.y+getCanvasPos(1)/2)
            if(tile.facing == 'north') ctx.rotate(270*Math.PI/180)
            if(tile.facing == 'east') ctx.rotate(0*Math.PI/180)
            if(tile.facing == 'south') ctx.rotate(90*Math.PI/180)
            if(tile.facing == 'west') ctx.rotate(180*Math.PI/180)
            ctx.translate(-tileImagePos.x-getCanvasPos(1)/2, -tileImagePos.y-getCanvasPos(1)/2)
        } 
        // draw tile     
        ctx.drawImage(tileImage, tileImagePos.x, tileImagePos.y, game.pixelSize*game.pixelInTile, game.pixelSize*game.pixelInTile)
        ctx.restore()
    },
    grass(x, y) {
        // draw grass
        ctx.drawImage(sprites[game.world].grass[game.animationCount % 2], getCanvasPos(x-game.camera.x), getCanvasPos(y-game.camera.y), game.pixelSize*game.pixelInTile, game.pixelSize*game.pixelInTile)
    },
    player: function() {
        if(game.levelEditor) return
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

        ctx.drawImage(image, imagePos.x, imagePos.y, game.pixelSize*game.pixelInTile, game.pixelSize*game.pixelInTile)
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