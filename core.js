var FONT_splat
var debug = [180, 50, 400, 10, 5, 1, 0]
//             0   1    2   3  4  5

function preload () {
    IMG_cardback = loadImage("./assets/cardsleeve.png")
    FONT_splat = loadFont("./assets/splat.otf")
    
    CARDS = loadJSON("./lib/cards.json")
}

function setup () {
    createCanvas(800, 800)
    setupCards()
}

function draw () {
    background(50)
    fill("#ccccff")
    rect(10, 10, 100, 100)
    PATTERNS[1].draw(50, 50, 0)
    image(IMG_cardback, 380, 50, debug[2], (IMG_cardback.height * debug[2]) / IMG_cardback.width)
    drawCard(debug[0], debug[1], debug[6], debug[2], debug[5])
}