const canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

async function Game () {
    await getCards()
    setupCards()
    PATTERNS[0].draw(ctx)
}

Game()