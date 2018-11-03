const game = {
    keys: [],
    players: {
        apollo: {
            x: 10,
            y: 10
        },
        artemis: {
            x: 10,
            y: 10

        }
    },
    images: {},
    animations: {},
    ticksTillNextAnimation: 0,
    animationCount: 0,
    pixelSize: 4,
    pixelInTile: 32,
    tiles: {},
    camera: {
        x: 0,
        y: 0,
    },
    world: 'artemis',
    loadLevel: function(level) {
        console.log(level)
        game.tiles.bounds = level.bounds
        for(let x = 0; x < level.bounds.x; x++) {
            game.tiles[x] = []
            for(let y = 0; y < level.bounds.y; y++) {
                game.tiles['artemis'][x][y] = {
                    type: 'grass'
                    
                }
                game.tiles['apollo'][x][y] = {
                    type: 'grass'
                    
                }
            }
        }
        for(let tile of level.artemis) {
            game.tiles['artemis'][tile.x][tile.y] = tile.tileData
        }
        for(let tile of level.apollo) {
            game.tiles['apollo'][tile.x][tile.y] = tile.tileData
        }
        console.log(game.tiles)
    },
    reset: function() {

    }
}