function tick() {
    // on WASD or Arrows hold
    if(game.keys[87] || game.keys[38]) game.players[game.world].y -= 0.05 // north
    if(game.keys[68] || game.keys[39]) game.players[game.world].x += 0.05 // east
    if(game.keys[83] || game.keys[40]) game.players[game.world].y += 0.05 // south
    if(game.keys[65] || game.keys[37]) game.players[game.world].x -= 0.05 // west

    cameraMovement()
    //VKCameraMovement()

    // animations
    game.ticksTillNextAnimation--
    if(game.ticksTillNextAnimation == 0) {
        game.animationsCounter++
        game.ticksTillNextAnimation = 100
    }
}


function cameraMovement() {
    let topRightX = game.players[game.world].x-(window.innerWidth/2/game.pixelSize/game.pixelInTile)
    let topRightY = game.players[game.world].y-(window.innerHeight/2/game.pixelSize/game.pixelInTile)
    let middleX = window.innerWidth/2/game.pixelSize/game.pixelInTile
    let middleY = window.innerHeight/2/game.pixelSize/game.pixelInTile
    // If the difference (position) of the camera and player is greater than x. Make the camera move to the player
    if((topRightX > 0 && topRightX+window.innerWidth/game.pixelSize/game.pixelInTile < game.level) && (Math.abs(game.players[game.world].x-game.camera.x-middleX) > 1))  game.camera.x += (game.players[game.world].x-game.camera.x-middleX)/30
    if((topRightY > 0 && topRightY+window.innerHeight/game.pixelSize/game.pixelInTile < 101) && (Math.abs(game.players[game.world].y-game.camera.y-middleY) > 0.5))  game.camera.y += (game.players[game.world].y-game.camera.y-middleY)/15    
}

