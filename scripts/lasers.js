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
    if(tile != undefined && tile.type != 'laserEmitter' && tile.type != 'laser') return

    // if world border return
    if(x >= game.tiles.bounds.x || x <= 0) return
    if(y >= game.tiles.bounds.y || y <= 0) return

    // create new laser tile
    game.tiles[game.world].push({
        x: x,
        y: y,
        facing: facing,
        type: 'laser'
    })
    // spread laser more
    if(facing == 'north') spreadLaser(x, y-1, facing)
    if(facing == 'east') spreadLaser(x+1, y, facing)
    if(facing == 'south') spreadLaser(x, y+1, facing)
    if(facing == 'west') spreadLaser(x-1, y, facing)
}