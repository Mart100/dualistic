function tick() {
    // on WASD or Arrows hold
    if(game.keys[87] || game.keys[38]) { // north
        game.facing = 'north'
        //if(game.players[game.world].y-1.5 > 0) 
       
        move({
            x: 0, 
            y: -0.05
        }, 
        {
            x: 0, 
            y: -0.5
        }, 0, -1)
    }
    if(game.keys[68] || game.keys[39]) { // east
        game.facing = 'east'
        //if(game.players[game.world].x+1.5 < game.tiles.bounds.x) game.players[game.world].x += 0.05
        move({
            x: 0.05, 
            y: 0
        }, 
        {
            x: 0.5, 
            y: 0
        }, 1, 0)
    }
    if(game.keys[83] || game.keys[40]) { // south
        game.facing = 'south'
        //if(game.players[game.world].y+1.5 < game.tiles.bounds.y) game.players[game.world].y += 0.05
        move({
            x: 0, 
            y: 0.05
        }, 
        {
            x: 0, 
            y: 0.5
        }, 0, 1)
    }
    if(game.keys[65] || game.keys[37]) { // west
        game.facing = 'west'
        //if(game.players[game.world].x-1.5 > 0) game.players[game.world].x -= 0.05
        move({
            x: -0.05, 
            y: 0
        }, 
        {
            x: -0.5, 
            y: 0
        }, -1, 0)
    }

    cameraMovement()
    buttonCollision()
    movingTiles()
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

function movingTiles() {
    for(let i in game.tiles.inMovement) {
        let tile = game.tiles.inMovement[i]
        tile[0].x += tile[1][0]
        tile[0].y += tile[1][1]
        if(Math.abs(tile[0].x-tile[2][0]) < 0.001 && Math.abs(tile[0].y-tile[2][1]) < 0.001) {
            
            tile[0].x=tile[2][0]
            tile[0].y=tile[2][1]
            game.tiles.inMovement.splice(i)
        }
    }
}


const moveTime = 50
function move(speed, collisionOffset, xOffset, yOffset) {
    let player = game.players[game.world]
    if(player.y+collisionOffset.y < 1 && collisionOffset.y != 0) return
    if(player.x+collisionOffset.x < 1 && collisionOffset.x != 0) return
    let tileColliding = game.tiles[game.world].find(tile => Math.floor(tile.x) == Math.floor(player.x+collisionOffset.x) && Math.floor(tile.y) == Math.floor(player.y+collisionOffset.y) && tile.fixed == undefined && game.pushables.includes(tile.type))
    if(tileColliding != undefined) {
        addMovingTile(tileColliding, player, speed, xOffset, yOffset)
    } else {
        game.players[game.world].y += speed.y
        game.players[game.world].x += speed.x
    }
    
}

function addMovingTile(tile, player, speed, xOffset, yOffset) {
    if(player.collidingTime > moveTime) {
        let tileAfter = game.tiles[game.world].find(tile => tile.x == Math.round(tile.x+xOffset) && tile.y == Math.round(tile.y+yOffset))
        if(tileAfter != undefined) addMovingTile(tileAfter, player, speed, xOffset, yOffset)
        game.players[game.world].collidingTime = 0
        game.tiles.inMovement.push([tile, [speed.x, speed.y], [Math.round(tile.x+xOffset), Math.round(tile.y+yOffset)]])
        
    } else player.collidingTime++
}


function buttonCollision() {

    let artemisButtonsColliding = game.tiles.artemis.find(t => t.x == Math.floor(game.players.artemis.x) && t.y == Math.floor(game.players.artemis.y+0.5) && t.type == 'button')
    let apolloButtonsColliding = game.tiles.apollo.find(t => t.x == Math.floor(game.players.apollo.x) && t.y == Math.floor(game.players.apollo.y+0.5) && t.type == 'button')

    // turn off all buttons in artemis
    for(let tile of game.tiles.artemis) {
        if(tile.type == 'button') game.deactivateBlock(tile)
    }

    // turn off all buttons in apollo
    for(let tile of game.tiles.apollo) {
        if(tile.type == 'button') game.deactivateBlock(tile)
    }

    // if artemis is standing on a button
    if(artemisButtonsColliding != undefined) game.activateBlock(artemisButtonsColliding)

    // if apollo is standing on a button
    if(apolloButtonsColliding != undefined) game.activateBlock(apolloButtonsColliding)
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