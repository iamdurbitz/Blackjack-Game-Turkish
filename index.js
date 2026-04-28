let player = {
    name: "Tarık",
    chips: 1000
}
let isBetted = false
let betAmount = 0
let dealerCards = []
let dealerSum = 0
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let isWon = false
let isDealerHandGood = false
let isDealerAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let dealerHandEl = document.getElementById("dealer-hand-el")
let dealerSumEl = document.getElementById("dealer-sum-el")
let playerEl = document.getElementById("player-el")
let betAmountEl = document.getElementById("bet-amount-el")
let startGameBtnEl = document.getElementById("start-game-btn-el")

playerEl.textContent = "Bakiye: ₺" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if (isBetted === true) {
        if (betAmount <= player.chips){
            isAlive = true
            hasBlackJack = false
            isWon = false
            isDealerHandGood = false
            isDealerAlive = true
            let firstCard = getRandomCard()
            let secondCard = getRandomCard()
            cards = [firstCard, secondCard]
            sum = firstCard + secondCard
            let dealerFirstCard = getRandomCard()
            let dealerSecondCard = getRandomCard()
            dealerCards = [dealerFirstCard, dealerSecondCard]
            dealerSum = dealerFirstCard + dealerSecondCard
            startGameBtnEl.textContent = "YENİ OYUN"
            renderGame()
            isBetted = false
            player.chips -= betAmount
            playerEl.textContent = player.name + ": $" + player.chips
        } else {
            messageEl.textContent = "Geçersiz bahis miktarı!!"
        }
    } else {
        messageEl.textContent = "Önce bahis vermeniz gerekiyor!!"
    }
}

function renderGame() {
    cardsEl.textContent = "Eliniz: "
    dealerHandEl.textContent = "Krupiyenin eli: " + dealerCards[0] + " + ?"
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Kartlarınızın toplamı: " + sum
    dealerSumEl.textContent = "Krupiyenin eli: " + dealerCards[0]
    if (sum <= 20) {
        message = "Yeni bir kart çekmek ister misiniz?"
    } else if (sum === 21) {
        message = "Kazandınız!"
        hasBlackJack = true
        player.chips += betAmount * 2
        playerEl.textContent = player.name + ": ₺" + player.chips
    } else {
        message = "Kaybettiniz!"
        isAlive = false
        playerEl.textContent = player.name + ": ₺" + player.chips
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false && isWon === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function stand() {
    if (isAlive === true && hasBlackJack === false && isWon === false) {
        checkDealerHand()
        if (isAlive === true && sum === 21) {
            if (sum > dealerSum) {
                isWon = true
                message = "Kazandınız!!"
                player.chips += betAmount * 2
                playerEl.textContent = player.name + ": ₺" + player.chips
            } else if (sum === dealerSum) {
                isWon = true
                message = "Berabere!"
                player.chips += betAmount
                playerEl.textContent = player.name + ": ₺" + player.chips
            }
        } else if (dealerSum > 21 ) {
            isWon = true
            message = "Kazandınız!"
            player.chips += betAmount * 2
            playerEl.textContent = player.name + ": ₺" + player.chips
        } else if (isAlive === true && sum > dealerSum) {
            isWon = true
            message = "Kazandınız!"
            player.chips += betAmount * 2
            playerEl.textContent = player.name + ": ₺" + player.chips
        } else if (isAlive === true && sum < dealerSum) {
            isAlive = false
            message = "Kaybettiniz!"
            playerEl.textContent = player.name + ": ₺" + player.chips
        } else if (isAlive === true && sum === dealerSum) {
            isWon = true
            message = "Berabere!"
            player.chips += betAmount
            playerEl.textContent = player.name + ": ₺" + player.chips
        } else if (isAlive === false) {
            isAlive = false
            message = "Kaybettiniz!!"
            playerEl.textContent = player.name + ": ₺" + player.chips
        }
        messageEl.textContent = message
    }
    dealerHandEl.textContent = "Krupiyenin eli: "
    for (let i = 0; i < dealerCards.length; i++) {
    dealerHandEl.textContent += dealerCards[i] + " "
    }
    dealerSumEl.textContent = "Krupiyenin kartlarının toplamı: " + dealerSum
}

function checkDealerHand() {
    if (isDealerHandGood === false) {
        if (dealerSum <= 17) {
            if (dealerSum >= sum && dealerSum <= 21) {
                isDealerHandGood = true
            } else if (dealerSum < sum && dealerSum <= 21) {
                isDealerHandGood = false
                dealerNewCard()
                checkDealerHand()
            } else if (dealersum === sum && dealerSum < 17) {
                isDealerHandGood = false
                dealerNewCard()
                checkDealerHand()
            }
        }
    } else if (isDealerHandGood === true) {
        stand()
    }
}

function dealerNewCard() {
    if (isDealerAlive === true && isDealerHandGood === false) {
        let card = getRandomCard()
        dealerSum += card
        dealerCards.push(card)
        renderGame()        
    }
}

function placeBet() {
    if (isBetted === false) {
        betAmount = parseInt(document.getElementById("bet-input").value)
        betAmountEl.textContent = "Bahis miktarı: ₺" + betAmount
        isBetted = true
    } else {
    betAmountEl.textContent = "Zaten bahis verdiniz! "
        setTimeout(function() {
            betAmountEl.textContent = "Bahis miktarı: ₺" + betAmount
        }, 3000)
    }
}