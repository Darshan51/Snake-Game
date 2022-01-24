const foodSound = new Audio("food.mp3");

var snakeArr = [{ x: 0, y: 0 }]
let foodPos = { x: 5, y: 5 };

const board = document.getElementById("board")
const currentScore = document.getElementById('current-score')
const highestScore = document.getElementById('highest-score')
export default class Snake {
    public
    constructor() {
        this.resetSnake()
        this.resetFood();
        this.snakeObj = snakeArr;
    }

    displaySnake() {
        board.innerHTML = '';
        this.displayFood();
        for (let i = 0; i < snakeArr.length; i++) {
            const elem = document.createElement('div');
            const clas = i == 0 ? 'snake-head' : 'snake'

            elem.classList.add(clas);
            elem.style.gridColumnStart = snakeArr[i].x;
            elem.style.gridRowStart = snakeArr[i].y;
            //console.log(elem)
            board.appendChild(elem);

        }
    }

    // reset and display food
    displayFood() {
        const foodElem = document.createElement('div')
        foodElem.innerHTML = 'Food'
        foodElem.style.fontSize = "10px"
        foodElem.classList.add('food');
        foodElem.style.gridColumnStart = foodPos.x;
        foodElem.style.gridRowStart = foodPos.y;

        board.appendChild(foodElem)
    }

    // Reset for restart 
    resetSnake() {

        snakeArr = [{ x: randomNum(5, 10), y: randomNum(5, 10) }];
        this.snakeObj = snakeArr
    }
    resetFood() {
        foodPos = { x: randomNum(1, 18), y: randomNum(1, 18) }
        snakeArr.forEach((e, index) => {
            if (foodPos == e) resetFood();
        })
    }

    //Move the Snake
    move(InputDir) {

        for (let i = snakeArr.length - 1; i > 0; i--) {
            snakeArr[i].x = snakeArr[i - 1].x;
            snakeArr[i].y = snakeArr[i - 1].y;
        }
        snakeArr[0].x += InputDir.x;
        snakeArr[0].y += InputDir.y;
        this.snakeObj = snakeArr;
        this.displaySnake();
    }

    resetScore() {
        currentScore.innerHTML = '0';
    }

    update(InputDir) {

        if ((foodPos.x == snakeArr[0].x) && (foodPos.y == snakeArr[0].y)) {
            scoreUpdate();
            foodSound.play();
            snakeArr.push(foodPos);
            this.resetFood()
        }
        if (InputDir.x != 0 || InputDir.y != 0)
            this.move(InputDir)
        else {
            this.displayFood();
            this.displaySnake();
        }

    }

}

function randomNum(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);

}

function scoreUpdate() {
    var v = 1 + parseInt(currentScore.innerHTML);
    currentScore.innerHTML = v;
    if (parseInt(highestScore.innerHTML) < v) highestScore.innerHTML = v;

}