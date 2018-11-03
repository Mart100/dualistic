$(document).on('keydown', (event) => {
    switch(event.keyCode) {
        case 9: {
            
            event.preventDefault()
            if(game.keys[event.keyCode]) return 
            if(game.world == 'artemis') {
                game.world = 'apollo'
            } else {
                game.world = 'artemis'
            }
            
            break;
        }
    }

    game.keys[event.keyCode] = true

    
})
$(document).on('keyup', (event) => {
    game.keys[event.keyCode] = false
})