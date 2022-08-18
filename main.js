const startBtn = document.querySelector("#start");
const allBoxes = document.querySelectorAll(".box");
const winnerColorBtn = document.querySelector("#winnerColor");
const bottomBoxEl = document.querySelector(".bottom-box")
let triesEl = document.querySelector('#triesEl')
let difficultyBtn = document.querySelector('#difficultyBtn')
let resultEl = document.querySelector('#result')
let difficultyChosen = false
var colorsCollection = [];
let tmpList = 6
let triesLeft = 2
let gameStarted = false

function generateRand(start, end) {
    return Math.round(Math.random() * (end - start) + start);
}

function generateColor() {
    return `rgb(${generateRand(0, 255)},${generateRand(0, 255)},${generateRand(0, 255)})`;
}

function getRandomColorsList() {
    var tmpColors = [];
    while (tmpColors.length < tmpList) {
        tmpColors.push(generateColor());
    }
    return tmpColors;
}


function setColorsToBoxes(colorsList) {
    allBoxes.forEach(item => {
        item.style.backgroundColor = colorsList.pop()
    })
}

function getLuckyColor(colorsList) {
    return colorsList[generateRand(0, colorsList.length - 1)];
}



startBtn.addEventListener("click", function () {
    colorsCollection = getRandomColorsList()
    luckyColor = getLuckyColor(colorsCollection)
    setColorsToBoxes(colorsCollection)
    winnerColorBtn.textContent = luckyColor
    resultEl.textContent = '......'
    resultEl.style.backgroundColor = 'teal'

    gameStarted = true
    triesLeft = 2
    triesEl.textContent = `tries left : ${triesLeft}`  
})

function alert(){
    Swal.fire({
        position: 'middle',
        icon: 'success',
        title: 'Wohoo!!!',
        showConfirmButton: true,
        backdrop: `
            rgba(0,0,123,0.4)
            url("./nyan-cat.gif")
            no-repeat
        `,
      })
}

allBoxes.forEach(item => {
    item.addEventListener('click',function(){
        if(gameStarted){
            let test = item.style.backgroundColor
            if(test.replaceAll(/ /g, "") == winnerColorBtn.textContent){
                resultEl.textContent = 'you won'
                resultEl.style.backgroundColor = 'green'
                gameStarted = false
                if(triesLeft == 2){
                    alert()
                }
            }else{
                resultEl.textContent = 'you lost'
                resultEl.style.backgroundColor = 'red'
                triesLeft --
                triesEl.textContent = `tries left : ${triesLeft}`
            }
            if(triesLeft == 0){
                gameStarted = false
            }
           
        }
    })
    
})


difficultyBtn.addEventListener('click',function(){
    difficultyBtn.classList.toggle('btn-primary')
    difficultyBtn.classList.toggle('btn-danger')
    if(difficultyBtn.classList.contains('btn-primary')){
        difficultyBtn.textContent = 'Easy'
        bottomBoxEl.style.visibility = 'hidden'
        tmpList = 3
    }else{
        difficultyBtn.textContent = 'Hard'
        bottomBoxEl.style.visibility = 'visible'
        tmpList = 6
    }
    resetGame()
})



function resetGame(){
    allBoxes.forEach(item => item.style.backgroundColor = 'steelblue')
    resultEl.textContent = '......'
    resultEl.style.backgroundColor = 'teal'
    winnerColorBtn.textContent = '....................'
    triesLeft = 2
    triesEl.textContent = `tries left : ${triesLeft}`
}



