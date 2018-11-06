let sprites = {
    artemis: {
        player: {
            still: {
                side: [new Image(), new Image()],
                back: [new Image(), new Image()],
                front: [new Image(), new Image()]
            },
        },
        grass: [new Image(), new Image()],
        blocks: {
            lamp: [new Image(), new Image()],
            button: [new Image(), new Image()],
            laserEmitter: [new Image(), new Image()],
            laser: [new Image(), new Image()],
            mirror: [new Image(), new Image()]
        }
    },
    apollo: {
        player: {
            still: {
                side: [new Image(), new Image()],
                back: [new Image(), new Image()],
                front: [new Image(), new Image()]
            },
        },
        grass: [new Image(), new Image()],
        blocks: {
            lamp: [new Image(), new Image()],
            button: [new Image(), new Image()],
            laserEmitter: [new Image(), new Image()],
            laser: [new Image(), new Image()],
            mirror: [new Image(), new Image()]
        }
    }
}

// artemis player sprites
sprites.artemis.player.still.side[0].src = 'https://i.imgur.com/eBo2PNv.png'
sprites.artemis.player.still.side[1].src = 'https://i.imgur.com/hLScDHm.png'

sprites.artemis.player.still.back[0].src = 'https://i.imgur.com/cIa5RQf.png'
sprites.artemis.player.still.back[1].src = 'https://i.imgur.com/CZ7VWFh.png'

sprites.artemis.player.still.front[0].src = 'https://i.imgur.com/2WwYvUl.png'
sprites.artemis.player.still.front[1].src = 'https://i.imgur.com/2WwYvUl.png'

// apollo player sprites
sprites.apollo.player.still.side[0].src = 'https://i.imgur.com/oHUXIYO.png'
sprites.apollo.player.still.side[1].src = 'https://i.imgur.com/oHUXIYO.png'

sprites.apollo.player.still.back[0].src = 'https://i.imgur.com/oHUXIYO.png'
sprites.apollo.player.still.back[1].src = 'https://i.imgur.com/oHUXIYO.png'

sprites.apollo.player.still.front[0].src = 'https://i.imgur.com/oHUXIYO.png'
sprites.apollo.player.still.front[1].src = 'https://i.imgur.com/oHUXIYO.png'


// all blocks

// grass
sprites.artemis.grass[0].src = 'https://i.imgur.com/r5sVO7Y.png'
sprites.artemis.grass[1].src = 'https://i.imgur.com/407XmgG.png'
sprites.apollo.grass[0].src = 'https://i.imgur.com/jOm9RjT.png'
sprites.apollo.grass[1].src = 'https://i.imgur.com/21RUAaK.png'

// lamps
sprites.artemis.blocks.lamp[0].src = 'https://i.imgur.com/sAUMzwS.png'
sprites.artemis.blocks.lamp[1].src = 'https://i.imgur.com/laGvZao.png'
sprites.apollo.blocks.lamp[0].src = 'https://i.imgur.com/sAUMzwS.png'
sprites.apollo.blocks.lamp[1].src = 'https://i.imgur.com/laGvZao.png'

// buttons
sprites.artemis.blocks.button[0].src = 'https://i.imgur.com/YVeV0dj.png'
sprites.artemis.blocks.button[1].src = 'https://i.imgur.com/aAnR0OD.png'
sprites.apollo.blocks.button[0].src = 'https://i.imgur.com/YVeV0dj.png'
sprites.apollo.blocks.button[1].src = 'https://i.imgur.com/aAnR0OD.png'

// laser emitter
sprites.artemis.blocks.laserEmitter[0].src = 'https://i.imgur.com/wGTIpHM.png'
sprites.artemis.blocks.laserEmitter[1].src = 'https://i.imgur.com/BvB99m2.png'
sprites.apollo.blocks.laserEmitter[0].src = 'https://i.imgur.com/wGTIpHM.png'
sprites.apollo.blocks.laserEmitter[1].src = 'https://i.imgur.com/BvB99m2.png'

// laser
sprites.artemis.blocks.laser[0].src = 'https://i.imgur.com/g4cA1Hb.png'
sprites.artemis.blocks.laser[1].src = 'https://i.imgur.com/iYSFuhx.png'
sprites.apollo.blocks.laser[0].src = 'https://i.imgur.com/g4cA1Hb.png'
sprites.apollo.blocks.laser[1].src = 'https://i.imgur.com/iYSFuhx.png'

// mirror
sprites.artemis.blocks.mirror[0].src = 'https://i.imgur.com/g4cA1Hb.png'
sprites.artemis.blocks.mirror[1].src = 'https://i.imgur.com/iYSFuhx.png'
sprites.apollo.blocks.mirror[0].src = 'https://i.imgur.com/g4cA1Hb.png'
sprites.apollo.blocks.mirror[1].src = 'https://i.imgur.com/iYSFuhx.png'