const game = {
    keys: [],
    players: {
        apollo: {
            x: 10,
            y: 10,
            collidingTime: 0
        },
        artemis: {
            x: 10,
            y: 10,
            collidingTime: 0

        }
    },
    facing: 'east',
    images: {},
    ticksTillNextAnimation: 100,
    animationCount: 0,
    pixelSize: 4,
    pixelInTile: 32,
    tiles: {},
    camera: {
        x: 0,
        y: 0,
    },
    pushables: ['mirror'],
    world: 'apollo',
    loadLevel: function(level) {
        game.tiles = level
        game.tiles.inMovement = []
    },
    drawOrder: {
        'laserEmitter': 100,
        'mirror': 100,
        'portal': 100,
        'button': 100,
        'laserReceiver': 100,
        'laser': 110,
    },
    reset: function() {

    },
    activateBlock: function(tile) {
        tile.active = true
        if(tile.trigger == undefined) return
        let trigger = game.tiles[tile.trigger.world].find(t => t.x == tile.trigger.x && t.y == tile.trigger.y)
        if(trigger != undefined) trigger.active = true
        else console.log(tile.trigger)
    },
    deactivateBlock: function(tile) {
        tile.active = false
        if(tile.trigger == undefined) return
        let trigger = game.tiles[tile.trigger.world].find(t => t.x == tile.trigger.x && t.y == tile.trigger.y)
        if(trigger != undefined) trigger.active = false
        else console.log(tile.trigger)
    }
}