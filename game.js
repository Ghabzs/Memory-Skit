const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('.start'),
	restart: document.querySelector('.restart'),
    win: document.querySelector('.win'),
	site: document.querySelector('.site')
}

let img1 = new Image();
img1.src = "Assets/card-addiction.png";
let img2 = new Image();
img2.src = "Assets/card-maladie.png";
let img3 = new Image();
img3.src = "Assets/card-mauvaise-haleine.png";
let img4 = new Image();
img4.src = "Assets/card-tabagisme-passif.png";
let img5 = new Image();
img5.src = "Assets/card-optimisme.png";
let img6 = new Image();
img6.src = "Assets/card-stop-tabac.png";
let img7 = new Image();
img7.src = "Assets/card-sport.png";
let img8 = new Image();
img8.src = "Assets/card-meditation.png";
let imgBackground = new Image();
imgBackground.src = "Assets/card-top.png";

const win_sentences = [
"Ne limite pas tes défis, défis tes limites !",
"Prenez soin de votre corps, c'est le seul endroit où vous êtes obligés de vivre. - Jim Rohn",
"J'ai décidé d'être heureux parce que c'est bon pour la santé. - Voltaire"
]

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }


    const images = [img1.src, img2.src, img3.src, img4.src, img5.src, img6.src, img7.src, img8.src]
    const picks = pickRandom(images, (dimensions * dimensions) / 2) 
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <img class="card-front" src=${imgBackground.src}></img>
                    <img class="card-back" src=${item}></img>
                </div>
            `).join('')}
       </div>
    `
    
    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} mouvement(s)`
        selectors.timer.innerText = `chrono : ${state.totalTime} sec`
    }, 1000)
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')
        console.log(flippedCards[0].querySelector('.card-back').src)
        console.log(flippedCards[1].querySelector('.card-back').src)

        if (flippedCards[0].querySelector('.card-back').src === flippedCards[1].querySelector('.card-back').src) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }

    // If there are no more cards that we can flip, we won the game
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
			selectors.site.classList.remove('hidden')
			selectors.start.classList.add('hidden')
			selectors.restart.classList.remove('hidden')
            selectors.win.innerHTML = `
                <span class="win-sentence"><i>"
                    ${getRandomWinSentence()}"<i></span>
                <span class="win-text">Tu as gagné !<br />
                avec <span class="highlight">${state.totalFlips}</span> mouvements<br />
                    en <span class="highlight">${state.totalTime}</span> secondes
                </span>
            `

            clearInterval(state.loop)
        }, 1000)
    }
}

const getRandomWinSentence = () => {
    const i = Math.floor(Math.random() * win_sentences.length)
    return win_sentences[i];
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.className==='start' && !eventTarget.className.includes('disabled')) {
            startGame()
        } 
		else if (eventTarget.className==='restart'){
			window.location.reload()
		}
    })
}

generateGame()
attachEventListeners()