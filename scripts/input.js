$(document).on('keydown', (event) => {
    switch(event.keyCode) {
        case 9: {
            
            event.preventDefault()
            if(game.keys[event.keyCode]) return 
            if(game.world == 'artemis') {
                game.world = 'apollo'
                $('#canvas').css('background-color', '#3C8646')
            } else {
                game.world = 'artemis'
                $('#canvas').css('background-color', '#142D17')
            }
            
            break;
        }
    }

    game.keys[event.keyCode] = true

    
})
$(document).on('keyup', (event) => {
    game.keys[event.keyCode] = false
})