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

playerEl.textContent = player.name + ": $" + player.chips

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
            startGameBtnEl.textContent = "NEW GAME"
            renderGame()
            isBetted = false
            player.chips -= betAmount
            playerEl.textContent = player.name + ": $" + player.chips
        } else {
            messageEl.textContent = "Invalid bet amount!"
        }
    } else {
        messageEl.textContent = "You need to bet first!"
    }
}

function renderGame() {
    cardsEl.textContent = "Your cards: "
    dealerHandEl.textContent = "Dealer's cards: " + dealerCards[0] + " + ?"
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Your sum: " + sum
    dealerSumEl.textContent = "Dealer's sum: " + dealerCards[0]
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You Won!"
        hasBlackJack = true
        player.chips += betAmount * 2
        playerEl.textContent = player.name + ": $" + player.chips
    } else {
        message = "You lost!"
        isAlive = false
        playerEl.textContent = player.name + ": $" + player.chips
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
                message = "You won!"
                player.chips += betAmount * 2
                playerEl.textContent = player.name + ": $" + player.chips
            } else if (sum === dealerSum) {
                isWon = true
                message = "Tie!"
                player.chips += betAmount
                playerEl.textContent = player.name + ": $" + player.chips
            }
        } else if (dealerSum > 21 ) {
            isWon = true
            message = "You Won!"
            player.chips += betAmount * 2
            playerEl.textContent = player.name + ": $" + player.chips
        } else if (isAlive === true && sum > dealerSum) {
            isWon = true
            message = "You Won!"
            player.chips += betAmount * 2
            playerEl.textContent = player.name + ": $" + player.chips
        } else if (isAlive === true && sum < dealerSum) {
            isAlive = false
            message = "You Lost!"
            playerEl.textContent = player.name + ": $" + player.chips
        } else if (isAlive === true && sum === dealerSum) {
            isWon = true
            message = "Tie!"
            player.chips += betAmount
            playerEl.textContent = player.name + ": $" + player.chips
        } else if (isAlive === false) {
            isAlive = false
            message = "You Lost!"
            playerEl.textContent = player.name + ": $" + player.chips
        }
        messageEl.textContent = message
    }
    dealerHandEl.textContent = "Dealer's cards: "
    for (let i = 0; i < dealerCards.length; i++) {
    dealerHandEl.textContent += dealerCards[i] + " "
    }
    dealerSumEl.textContent = "Dealer's sum: " + dealerSum
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
        betAmountEl.textContent = "Bet amount: $" + betAmount
        isBetted = true
    } else {
    betAmountEl.textContent = "You already placed a bet! "
        setTimeout(function() {
            betAmountEl.textContent = "Bet amount: $" + betAmount
        }, 3000)
    }
}