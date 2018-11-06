// reload laser each second
$(() => {
    setInterval(() => { reloadLasers() }, 100)
})


function reloadLasers() {
    deactivateStuff()
    for(let i=0;i<3;i++) {
        if(i == 0) world = 'artemis'
        if(i == 1) world = 'apollo'
        // remove all lazers
        game.tiles[world] = game.tiles[world].filter(a => a.type != 'laser')

        // add lasers
        for(let num in game.tiles[world]) {
            let tile = game.tiles[world][num]
            if((tile.type != 'laserEmitter' && tile.type != 'portal' ) || tile.active == false || tile.trigger != undefined) continue
            //spreadLaser(tile.x, tile.y, tile.facing, world)
            if(tile.facing == 'north') spreadLaser(tile.x, tile.y-1, tile.facing, world)
            if(tile.facing == 'east') spreadLaser(tile.x+1, tile.y, tile.facing, world)
            if(tile.facing == 'south') spreadLaser(tile.x, tile.y+1, tile.facing, world)
            if(tile.facing == 'west') spreadLaser(tile.x-1, tile.y, tile.facing, world)
        }
    }
}
function deactivateStuff() {
    for(let i=0;i<3;i++) {
        if(i == 0) world = 'artemis'
        if(i == 1) world = 'apollo'
        // deactivate all portals
        game.tiles[world].forEach(a => {
            if(a.type == 'portal') game.deactivateBlock(a)
        })
        // deactivate all laserReceivers
        game.tiles[world].forEach(a => {
            if(a.type == 'laserReceiver') game.deactivateBlock(a)
        })
    }
}
function spreadLaser(x, y, facing, world) {
    // if theres something where the laser wants to go return
    let tile = game.tiles[world].find((t) => t.x == x && t.y == y)
    if(tile != undefined && tile.type != 'laserEmitter' && tile.type != 'laser' && tile.type != 'mirror' && tile.type != 'laserReceiver' && tile.type != 'portal') return

    // if world border return
    if(x >= game.tiles.bounds.x || x <= 0) return
    if(y >= game.tiles.bounds.y || y <= 0) return

    // if mirror
    if(tile != undefined && tile.type == 'mirror') {
        let newfacing = facing
        if(facing == 'north') {
            if(tile.facing == 'west') { spreadLaser(x-1, y, 'west', world); addLaser(x, y, 'west', world) }
            else if(tile.facing == 'south') { spreadLaser(x+1, y, 'east', world); addLaser(x, y, 'east', world) }
            else return
        }
        else if(facing == 'east') {
            if(tile.facing == 'west') { spreadLaser(x, y+1, 'south', world); addLaser(x, y, 'south', world) }
            else if(tile.facing == 'north') { spreadLaser(x, y-1, 'north', world); addLaser(x, y, 'north', world) }
            else return
        }
        else if(facing == 'south') {
            if(tile.facing == 'north') { spreadLaser(x-1, y, 'west', world); addLaser(x, y, 'west', world) }
            else if(tile.facing == 'east') { spreadLaser(x+1, y, 'east', world); addLaser(x, y, 'east', world) }
            else return
        }
        else if(facing == 'west') {
            if(tile.facing == 'east') { spreadLaser(x, y-1, 'north', world); addLaser(x, y, 'north', world) }
            else if(tile.facing == 'south') { spreadLaser(x, y+1, 'south', world); addLaser(x, y, 'south', world) }
            else return
        }
        addLaser(x, y, facing, world)
    }
    // else if touching laserReceiver
    else if(tile != undefined && tile.type == 'laserReceiver') {
        game.activateBlock(game.tiles[world].find(i => i.x == x && i.y == y && i.type == 'laserReceiver'))
    }
    // else if touching portal
    else if(tile != undefined && tile.type == 'portal') {
        game.activateBlock(game.tiles[world].find(i => i.x == x && i.y == y && i.type == 'portal'))
    }
    // else just go forwards
    else {
        addLaser(x, y, facing, world)
        if(facing == 'north') spreadLaser(x, y-1, facing, world)
        if(facing == 'east') spreadLaser(x+1, y, facing, world)
        if(facing == 'south') spreadLaser(x, y+1, facing, world)
        if(facing == 'west') spreadLaser(x-1, y, facing, world)
    }
}
function addLaser(x, y, facing, world) {
    // create new laser tile
    game.tiles[world].push({
        x: x,
        y: y,
        facing: facing,
        type: 'laser'
    })
}