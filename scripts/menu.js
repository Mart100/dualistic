$(() => {
    $('#menu-play').on('click', () => {
        $('#menu').css('display', 'none')
    })
    $('#menu-levelEditor').on('click', () => {
        $('#menu').css('display', 'none')
        $('#lvlEdit').css('display', 'block')
        $('#lvlEdit-minimize').css('display', 'block')
        game.levelEditor = true
        game.playerSpeed = 0.1
        game.loadLevel({
            bounds: {x: 10, y: 10},
            apollo: [],
            artemis: []


        })
    })
})