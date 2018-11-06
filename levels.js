let levels = [
    //test level hey
    {
        bounds: {
            x: 25,
            y: 25
        },
        artemis: [
            {
                x: 6,
                y: 5,
                type: 'button',
                active: false,
                trigger: {
                    x: 3,
                    y: 3,
                    world: 'artemis'
                }
            },            
            {
                x: 5,
                y: 5,
                type: 'lamp',
                active: false,
            },
            {
                x: 3,
                y: 3,
                type: 'laserEmitter',
                facing: 'east',
                active: false
            },
            {
                x: 7,
                y: 3,
                type: 'portal',
                facing: 'west',
                active: false,
                trigger: {
                    world: 'apollo',
                    x: 2,
                    y: 3
                },
                color: '#4253f4'
            }
        ],
        apollo: [
            {
                x: 2,
                y: 3,
                type: 'portal',
                facing: 'east',
                active: false,
                color: '#4253f4'
                
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
            },
            {
                x: 2,
                y: 5,
                type: 'laserReceiver',
                facing: 'east',
                active: false,
                trigger: {
                    x: 5,
                    y: 5,
                    world: 'artemis'
                }
            }
        ]
    }
]