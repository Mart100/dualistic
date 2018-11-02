const game = {
    players: {
        apollo: {
            x: 0,
            y: 0
        },
        artemis: {
            x: 0,
            y: 0

        }
    },
    pixelSize = 8,
    pixelInTile = 16,
    grid: null,
    camera: {
        x: 0,
        y: 0,
    },
    mode: 'artemis',
    loadLevel(level) {
        game.level = level
    },
    reset() {

    },
    movePlayer() {
        if(mode == 'artemis') {

        } else {

        }
    }
}