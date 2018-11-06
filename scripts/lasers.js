// reload laser each second
setInterval(() => { reloadLasers() }, 1000)


function reloadLasers() {
    // remove all lazers
    game.tiles[game.world] = game.tiles[game.world].filter(i => i.type != 'laser')


    // add lasers
    for(let num in game.tiles[game.world]) {
        let tile = game.tiles[game.world][num]
        if(tile.type != 'laserEmitter' || tile.active == false) continue
        spreadLaser(tile.x, tile.y, tile.facing)
    }
}
function spreadLaser(x, y, facing) {
    // if theres something where the laser wants to go return
    let tile = game.tiles[game.world].find((t) => t.x == x && t.y == y)
    if(tile != undefined && tile.type != 'laserEmitter' && tile.type != 'laser' && tile.type != 'mirror') return

    // if world border return
    if(x >= game.tiles.bounds.x || x <= 0) return
    if(y >= game.tiles.bounds.y || y <= 0) return

    addLaser(x, y, facing)
    // if mirror
    if(tile != undefined && tile.type == 'mirror') {
        let newfacing = facing
        if(facing == 'north') {
            if(tile.facing == 'west') { spreadLaser(x-1, y, 'west'); addLaser(x, y, 'west') }
            else if(tile.facing == 'south') { spreadLaser(x+1, y, 'east'); addLaser(x, y, 'east') }
            else return
        }
        else if(facing == 'east') {
            if(tile.facing == 'west') { spreadLaser(x, y+1, 'south'); addLaser(x, y, 'south') }
            else if(tile.facing == 'north') { spreadLaser(x, y-1, 'north'); addLaser(x, y, 'north') }
            else return
        }
        else if(facing == 'south') {
            if(tile.facing == 'north') { spreadLaser(x-1, y, 'west'); addLaser(x, y, 'west') }
            else if(tile.facing == 'east') { spreadLaser(x+1, y, 'east'); addLaser(x, y, 'east') }
            else return
        }
        else if(facing == 'west') {
            if(tile.facing == 'east') { spreadLaser(x, y-1, 'north'); addLaser(x, y, 'north') }
            else if(tile.facing == 'south') { spreadLaser(x, y+1, 'south'); addLaser(x, y, 'south') }
            else return
        }
    }
    // else just go forwards
    else {
        if(facing == 'north') spreadLaser(x, y-1, facing)
        if(facing == 'east') spreadLaser(x+1, y, facing)
        if(facing == 'south') spreadLaser(x, y+1, facing)
        if(facing == 'west') spreadLaser(x-1, y, facing)
    }
}
function addLaser(x, y, facing) {
    // create new laser tile
    game.tiles[game.world].push({
        x: x,
        y: y,
        facing: facing,
        type: 'laser'
    })
}