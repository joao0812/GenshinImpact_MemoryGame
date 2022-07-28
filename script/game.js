let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0]

        if (card.flip || this.lockMode) {
            return false
        }
        if (!this.firstCard) {
            this.firstCard = card
            this.firstCard.flip = true
            return true
        } else {
            this.secondCard = card
            this.secondCard.flip = true
            this.lockMode = true
            return true
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.nome === this.secondCard.nome
    },

    clearCard: function () {
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    personagens:
        [{ nome: 'beidou', elemento: 'electro' },
        { nome: 'child', elemento: 'hydro' },
        { nome: 'ganyu', elemento: 'cryo' },
        { nome: 'jean', elemento: 'anemo' },
        { nome: 'kaeya', elemento: 'cryo' },
        { nome: 'shogoun', elemento: 'electro' },
        { nome: 'sucrose', elemento: 'anemo' },
        { nome: 'thoma', elemento: 'pyro' },
        { nome: 'xingqiu', elemento: 'hydro' },
        { nome: 'yoimia', elemento: 'pyro' }],

    cards: [],

    creatCards: function (personagens) {

        for (let personagem of personagens) {
            this.cards.push(this.creatPair(personagem));
        }
        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards(this.cards)
    },

    creatPair: function (personagem) {
        return [{
            id: this.creatPersonagemID(personagem.nome),
            nome: personagem.nome,
            flip: false,
            elemento: personagem.elemento
        }, {
            id: this.creatPersonagemID(personagem.nome),
            nome: personagem.nome,
            flip: false,
            elemento: personagem.elemento
        }]
    },

    creatPersonagemID: function (nome) {
        return nome + parseInt(Math.random() * 1000)
    },

    shuffleCards: function (card) {
        let currentIndex = card.length
        let randomIndex = 0

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },
}