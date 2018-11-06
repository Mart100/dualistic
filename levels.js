let levels = [
    //test level hey
    {
        bounds: {
            x: 25,
            y: 25
        },
        artemis: [
            {
                x: 5,
                y: 5,
                type: 'button',
                active: false,
                trigger: {
                    x: 2,
                    y: 3,
                    world: 'apollo'
                }
            }
        ],
        apollo: [
            {
                x: 2,
                y: 3,
                type: 'laserEmitter',
                facing: 'east',
                active: false
                
            },
            {
                x: 5,
                y: 3,
                type: 'mirror',
                facing: 'west'
            },
            {
                x: 5,
                y: 6,
                type: 'mirror',
                facing: 'east'
            },
            {
                x: 7,
                y: 6,
                type: 'mirror',
                facing: 'north'
            },
            {
                x: 7,
                y: 3,
                type: 'mirror',
                facing: 'south'
            },
            {
                x: 8,
                y: 3,
                type: 'mirror',
                facing: 'west'
            },
            {
                x: 8,
                y: 5,
                type: 'mirror',
                facing: 'north'
            }
        ]
    }
]