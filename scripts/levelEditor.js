$(() => {
    // minimize click
    $('#lvlEdit-minimize').on('click', () => {
        // if lvlEdit is closed. Open
        if($('#lvlEdit').css('height') == '0px') {
            $('#lvlEdit').css('display', 'block')
            $('#lvlEdit').animate({'height': '100px'}, 400)
        } 
        // else if lvlEdit is open. Close
        else {
            $('#lvlEdit').animate({'height': '0px'}, 400, () => $('#lvlEdit').css('display', 'none'))
        }
    })

    // importJSON button
    $('#lvlEdit-levelJSON').on('click', () => {
        $('#textInput textarea').val(JSON.stringify(game.tiles))
        $('#textInput').css('display', 'block')
        $('#textInput button').off().on('click', () => {
            game.loadLevel(JSON.parse($('#textInput textarea').val()))
            $('#textInput').css('display', 'none')
        })
    })

    // get building JSON
    $('#lvlEdit-buildingJSON').on('click', () => { game.levelEdit.mode = 'buildingJSON'})

    // buildmode
    $('#lvlEdit-buildMode').on('click', () => { game.levelEdit.mode = 'build' })
    // removeMode
    $('#lvlEdit-removeMode').on('click', () => { game.levelEdit.mode = 'remove' })
    // rotateMode
    $('#lvlEdit-rotateMode').on('click', () => { game.levelEdit.mode = 'rotate' })

    // building type input
    $('#lvlEdit-buildingInput').on('change', () => {
        if(sprites[game.world].blocks[$('#lvlEdit-buildingInput').val()] != undefined) game.levelEdit.buildingType = $('#lvlEdit-buildingInput').val()
    })

    // click in levelEditorMode
    $('canvas').on('click', (event) => {
        // calculate what tile position
        let x = Math.floor(event.pageX/game.pixelSize/game.pixelInTile+game.camera.x)
        let y = Math.floor(event.pageY/game.pixelSize/game.pixelInTile+game.camera.y)
        console.log('works', x, y, game.levelEdit)
        switch(game.levelEdit.mode) {
            case('build'): {
                game.tiles[game.world].push({
                    type: game.levelEdit.buildingType,
                    x: x,
                    y: y,
                    facing: 'east'
                })
                break
            }
            case('remove'): {
                game.tiles[game.world] = game.tiles[game.world].filter(a => a.x != x || a.y != y)
                break
            }
            case('rotate'): {
                let tile = game.tiles[game.world].find(a => a.x == x && a.y == y && a.type != 'laser')
                if(tile == undefined) return
                if(tile.facing == 'north') tile.facing = 'east'
                else if(tile.facing == 'east') tile.facing = 'south'
                else if(tile.facing == 'south') tile.facing = 'west'
                else if(tile.facing == 'west') tile.facing = 'north'
                break
            }
            case('buildingJSON'): {
                let tile = game.tiles[game.world].find(a => a.x == x && a.y == y && a.type != 'laser')
                if(tile == undefined) return
                console.log(tile)

                $('#textInput textarea').val(JSON.stringify(tile))
                $('#textInput').css('display', 'block')
                $('#textInput button').off().on('click', () => {
                    game.tiles[game.world].forEach((a, b) => {
                        if(a.x == x && a.y == y && a.type != 'laser') game.tiles[game.world][b] = JSON.parse($('#textInput textarea').val())
                    })
                    $('#textInput').css('display', 'none')
                })
                break
            }
        }
    })

    // mouse on grid. XY
    $('canvas').on('mousemove', (event) => {
        let x = Math.floor(event.pageX/game.pixelSize/game.pixelInTile+game.camera.x)
        let y = Math.floor(event.pageY/game.pixelSize/game.pixelInTile+game.camera.y)
        $('#lvlEdit-mouseX').html(x)
        $('#lvlEdit-mouseY').html(y)
    })
})