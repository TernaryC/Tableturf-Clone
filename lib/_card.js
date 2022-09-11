var CARDS
var PATTERNS = []

function getCards () {
    return new Promise((resolve, reject) => {
        fetch("./lib/cards.json")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            CARDS = data
            resolve(CARDS)
        })
    })
}

function setupCards () {
    for (c of CARDS.cards) {
        PATTERNS.push(new Pattern(c))
    }
}

class Pattern {
    constructor(card) {
        this.id = card.id
        this.pattern = this.register(card.pattern)
    }
    
    register(pattern) {
        let converted = [[]]
        let i = 0
        for (c of pattern) {
            switch (c) {
                case '-': converted[i].push(0); break
                case 'X': converted[i].push(2); break
                case ',': converted.push([]); i++; break
                default:
                    for (let _ = 0; _ < parseInt(c); _++) converted[i].push(1)
            }
        }
        return converted
    }
    
    draw(ctx) {
        ctx.fillStyle = "#FF0000"
        ctx.fillRect(50,50,150,150)
    }
}