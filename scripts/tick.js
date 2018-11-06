function tick() {
    // on WASD or Arrows hold
    if(game.keys[87] || game.keys[38]) { // north
        game.facing = 'north'
        if(game.players[game.world].y-1.5 > 0) game.players[game.world].y -= 0.05

    }
    if(game.keys[68] || game.keys[39]) { // east
        game.facing = 'east'
        if(game.players[game.world].x+1.5 < game.tiles.bounds.x) game.players[game.world].x += 0.05
    }
    if(game.keys[83] || game.keys[40]) { // south
        game.facing = 'south'
        if(game.players[game.world].y+1.5 < game.tiles.bounds.y) game.players[game.world].y += 0.05
    }
    if(game.keys[65] || game.keys[37]) { // west
        game.facing = 'west'
        if(game.players[game.world].x-1.5 > 0) game.players[game.world].x -= 0.05
    }

    cameraMovement()
    buttonCollision()

    // animations
    game.ticksTillNextAnimation--
    if(game.ticksTillNextAnimation == 0) {
        game.animationCount++
        game.ticksTillNextAnimation = 40
    }
    // resize canvas to window
    if(canvas.width != window.innerWidth) canvas.width = window.innerWidth
    if(canvas.width != window.innerHeight) canvas.height = window.innerHeight
}

function buttonCollision() {

    let artemisButtonsColliding = game.tiles.artemis.find(t => t.x == Math.floor(game.players.artemis.x) && t.y == Math.floor(game.players.artemis.y+0.5) && t.type == 'button')
    let apolloButtonsColliding = game.tiles.apollo.find(t => t.x == Math.floor(game.players.apollo.x) && t.y == Math.floor(game.players.apollo.y+0.5) && t.type == 'button')

    // turn off all buttons in artemis
    for(let tile of game.tiles.artemis) {
        if(tile.type == 'button') {
            tile.active = false
            game.tiles[tile.trigger.world].find(t => t.x == tile.trigger.x && t.y == tile.trigger.y).active = false
        }
    }

    // turn off all buttons in apollo
    for(let tile of game.tiles.apollo) {
        if(tile.type == 'button') {
            tile.active = false
            game.tiles[tile.trigger.world].find(t => t.x == tile.trigger.x && t.y == tile.trigger.y).active = false
        }
    }

    // if artemis is standing on a button
    if(artemisButtonsColliding != undefined && !artemisButtonsColliding.active) {
        artemisButtonsColliding.active = true
        game.tiles[artemisButtonsColliding.trigger.world].find(t => t.x == artemisButtonsColliding.trigger.x && t.y == artemisButtonsColliding.trigger.y).active = true
    } else {

    }

    // if apollo is standing on a button
    if(apolloButtonsColliding != undefined && !apolloButtonsColliding.active) {
        apolloButtonsColliding.active = true
        game.tiles[apolloButtonsColliding.trigger.world].find(t => t.x == apolloButtonsColliding.trigger.x && t.y == apolloButtonsColliding.trigger.y).active = true
    }


}

function cameraMovement() {
    let topRightX = game.players[game.world].x-(window.innerWidth/2/game.pixelSize/game.pixelInTile)
    let topRightY = game.players[game.world].y-(window.innerHeight/2/game.pixelSize/game.pixelInTile)
    let middleX = window.innerWidth/2/game.pixelSize/game.pixelInTile
    let middleY = window.innerHeight/2/game.pixelSize/game.pixelInTile
    // If the difference (position) of the camera and player is greater than x. Make the camera move to the player
    if((topRightX > -0.5 && topRightX+window.innerWidth/game.pixelSize/game.pixelInTile < game.tiles.bounds.x) && (Math.abs(game.players[game.world].x-game.camera.x-middleX) > 1)) {
        game.camera.x += (game.players[game.world].x-game.camera.x-middleX)/30
    } else if (game.camera.x > 0.1 && game.camera.x < 2) game.camera.x += (game.players[game.world].x-game.camera.x-middleX)/75
    if((topRightY > 0 && topRightY+window.innerHeight/game.pixelSize/game.pixelInTile < game.tiles.bounds.y) && (Math.abs(game.players[game.world].y-game.camera.y-middleY) > 0.5)) game.camera.y += (game.players[game.world].y-game.camera.y-middleY)/15    
}