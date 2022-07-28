const gameBoard = document.getElementById('gameBoard')
const gameOver = document.getElementById('gameOver')

const FRONT = 'card_front'
const BACK = 'card_back'
const CARD = 'card'
const NOME = 'nome'


startGame()
console.log(game.cards)


function startGame() {
    game.creatCards(game.personagens)
    game.shuffleCards(game.cards)
    inicializeCards(game.cards)
}

function inicializeCards() {
    game.cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add('card')
        cardElement.dataset.nome = card.nome

        creatCardContent(card, cardElement)
        cardElement.addEventListener('click', flipCard)

        gameBoard.appendChild(cardElement)
    })
}

function creatCardContent(card, cardElement) {
    creatCardFace(FRONT, card, cardElement)
    creatCardFace(BACK, card, cardElement)
}

function creatCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if (face === FRONT) {
        let imgFrontElement = document.createElement('img')
        imgFrontElement.classList.add('front')
        imgFrontElement.src = `./assets/${card.nome}.png`
        cardElementFace.appendChild(imgFrontElement)
        cardElementFace.classList.add(`${card.elemento}`)
    } else {
        let imgBackElement = document.createElement('img')
        imgBackElement.classList.add('back')
        imgBackElement.src = './assets/primogem.png'
        cardElementFace.appendChild(imgBackElement)
    }
    element.appendChild(cardElementFace)
}

function flipCard() {
    /* console.log(this.classList.contains('flip')) */
    isWin()
    if (game.setCard(this.id)) {
        this.classList.add('flip')
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCard()
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')

                    game.firstCard.flip = false
                    game.secondCard.flip = false

                    game.clearCard()

                }, 1000)
            }
        }
    }
}
function isWin() {
    let cardFlipped = game.cards.filter(card => card.flip === true)
    let allCards = game.cards.length
    console.log(cardFlipped)
    console.log(allCards)
    if (cardFlipped.length === (allCards - 1)) {
        gameOver.style.display = 'flex'
    }
}
function reiniciar() {
    gameOver.style.display = 'none'
    game.cards.forEach(card => {
        let divCard = document.getElementById(card.id)
        divCard.classList.remove('flip')
        card.flip = false
        game.clearCard()
    })
}