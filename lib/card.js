var IMG_cardback
var CARDS
var PATTERNS = []

//                 width     corners       pointwidth  pointsize 
//                 |    height   gridcorners   pointgap|
//                 |    |    |   |     border  |   pointcorners
//                 |    |    |   |  gridweight |   |   |
var card_ratios = [290, 405, 22, 0, 5, 12, 82, 25, 20, 54]
//                 0    1    2   3  4  5   6   7   8   9

function setupCards () {
    for (c of CARDS.cards) {
        PATTERNS.push(new Pattern(c))
    }
}

function drawCard (x, y, t, w, i) {
    let card = CARDS.cards[i]
    let team = 0
    
    let ratio = w / card_ratios[0]
    push()
    translate(x, y)
    rotate(t)
    
    //Cardback
    noStroke()
    fill(CARDback)
    rect(0, 0, w, card_ratios[1] * ratio, card_ratios[2] * ratio)
    fill(CARDgrid)
    let gap = card_ratios[5] * ratio
    let s = w - 2 * card_ratios[5] * ratio
    let g = s / 8
    square(gap, gap, s, card_ratios[3] * ratio)
    
    //Pattern
    let pattern = PATTERNS[i]
    pattern.draw(gap + s/2 - g, gap + s/2 - g, 0, g, team)
    
    //Gridlines
    noFill()
    stroke(CARDback)
    strokeWeight(card_ratios[4] * ratio)
    for (let u = 0; u < 8; u++) {
        line(gap + g * u, gap - 1, gap + g * u, gap - 1 + s)
    }
    for (let v = 0; v < 8; v++) {
        line(gap - 1, gap + g * v, gap - 1 + s, gap + g * v)
    }
    
    //Score
    noStroke()
    fill(CARDblack)
    let pointy = gap + s + (card_ratios[7] * ratio)
    let points = card_ratios[6] * ratio
    rect(gap, pointy, points, points, card_ratios[8] * ratio)
    fill(CARDwhite)
    textFont(FONT_splat, card_ratios[9] * ratio)
    textAlign(CENTER, TOP)
    text(card.score, gap + (points / 2), pointy - gap)
    
    //Specil
    noStroke()
    fill(team == 0 ? SPECILyellow : SPECILblue)
    let specs = g - (1.5 * card_ratios[4] * ratio)
    for (let si = 0; si < card.specil; si++) {
        let inc = si * specs + (si * card_ratios[4] * ratio)
        square(points + (gap * 1.3) + inc, pointy + (gap * 0.7), specs)
    }
}

class Pattern {
    constructor (card_raw) {
        this.id = card_raw.id
        this.width = 1
        this.height = 1
        this.pattern = this.register(card_raw.pattern)
    }
    
    register (pattern) {
        let converted = [[]]
        let i = 0
        for (let c of pattern) {
            switch (c) {
                case '-': converted[i].push(0); break
                case 'X': converted[i].push(2); break
                case ',':
                    this.width = converted[i].length > this.width ? converted[i].length : this.width
                    converted.push([])
                    i++; this.height++
                    break
                default:
                    for (let _ = 0; _ < parseInt(c); _++) converted[i].push(1)
            }
        }
        return converted
    }
    
    getCenter () {
        return [floor(this.width/2 - 0.5), floor(this.height/2 - 0.5)]
    }
    
    draw (x, y, t, s, team) {
        let ink = team == 0 ? INKyellow : INKblue
        let specil = team == 0 ? SPECILyellow : SPECILblue
        push()
        translate(x, y)
        rotate(t)
        let cent = this.getCenter()
        let i = -cent[0], j = -cent[1]
        noStroke()
        for (let line of this.pattern) {
            for (let c of line) {
                fill(ink)
                switch (c) {
                    case 2: fill(specil)
                    case 1: rect(i*s, j*s, s, s)
                }
                i++
            }
            i = -cent[0]
            j++
        }
        pop()
    }
}