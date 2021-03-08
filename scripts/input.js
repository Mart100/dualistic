$(document).on('keydown', (event) => {
    switch(event.keyCode) {
        case(9): {
            event.preventDefault()
            if(game.keys[event.keyCode]) return 
            if(game.world == 'artemis') {
                game.world = 'apollo'
                $('#canvas').css('background-color', '#3C8646')
            } else {
                game.world = 'artemis'
                $('#canvas').css('background-color', '#142D17')
            }
            
            break;
        }
        case(69): {
            requestTileMove()
            break;
        }
    }
    game.keys[event.keyCode] = true
})
$(document).on('keyup', (event) => {
    game.keys[event.keyCode] = false
})

function requestTileMove() {
    let player = game.players[game.world]
    let tileCollidingNorth = game.tiles[game.world].find(tile => Math.floor(tile.x) == Math.floor(player.x) && Math.floor(tile.y) == Math.floor(player.y-0.5-0.05) && tile.fixed == undefined && game.pushables.includes(tile.type))
    let tileCollidingWest = game.tiles[game.world].find(tile => Math.floor(tile.x) == Math.floor(player.x-0.5-0.05) && Math.floor(tile.y) == Math.floor(player.y) && tile.fixed == undefined && game.pushables.includes(tile.type))
    let tileCollidingEast = game.tiles[game.world].find(tile => Math.floor(tile.x) == Math.floor(player.x+0.5+0.05) && Math.floor(tile.y) == Math.floor(player.y) && tile.fixed == undefined && game.pushables.includes(tile.type))    
    let tileCollidingSouth = game.tiles[game.world].find(tile => Math.floor(tile.x) == Math.floor(player.x) && Math.floor(tile.y) == Math.floor(player.y+0.5+0.05) && tile.fixed == undefined && game.pushables.includes(tile.type))
    if(tileCollidingNorth != undefined && game.facing == 'north') addMovingTile(tileCollidingNorth, {x: 0, y: -0.05}, 0, -1)
    else if(tileCollidingSouth != undefined && game.facing == 'south') addMovingTile(tileCollidingSouth, {x: 0, y: 0.05}, 0, 1)
    else if(tileCollidingWest != undefined && game.facing == 'west') addMovingTile(tileCollidingWest, {x: -0.05, y: 0}, -1, 0)
    else if(tileCollidingEast != undefined && game.facing == 'east') addMovingTile(tileCollidingEast, {x: 0.05, y: 0}, 1, 0)
}

function addMovingTile(tile, speed, xOffset, yOffset) {
    //x/yOffset is the x and the y of the tile it's moving too (eg: if a tile on 8,5 is moving to 7,5 the xOffset is -1 and the yOffset is 0)

    //check if the tile after is present, that should be pushed too
    let tileAfter = game.tiles[game.world].find(t => t.x == tile.x+xOffset && t.y == tile.y+yOffset && game.pushables.includes(t.type))
    console.log(tileAfter)
    if(tileAfter != undefined) addMovingTile(tileAfter, speed, xOffset, yOffset)
    game.tiles.inMovement.push([tile, [speed.x, speed.y], [tile.x+xOffset, tile.y+yOffset]])
    console.log(game.tiles.inMovement[game.tiles.inMovement.length-1])
        
    
}

// scrolling for zooming in and out in levelEditor mode
$(() => {
    $('body').on('DOMMouseScroll mousewheel', function(e) {
        if(!game.levelEditor) return
        if(e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) game.pixelSize -= 0.1
        else game.pixelSize += 0.1
    })
})