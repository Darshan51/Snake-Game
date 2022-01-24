import Snake from "./snake.js"

const gameOverSound = new Audio("gameover.mp3")
const musicsound = new Audio('music.mp3')
const moveSound = new Audio("move.mp3")
const snake = new Snake()
const speed = 200
var directions = { x: 0, y: 0 }
var prevDir = { x: 0, y: 0 }
let lastTime = 0
let time = 0;
var requestId


const body = document.getElementById('body');

body.addEventListener('keydown', function(event) {
    handleDir(event)
});

document.body.onkeyup = function(e) {

    if (e.keyCode == 32) {
        if (!requestId) {
            start();
        } else {
            musicsound.pause()
            stop();
        }
    }

}

snake.update(directions);


function main(time) {
    console.log("2")
    requestId = undefined;
    let delta = time - lastTime;

    if (isCollision()) {
        console.log("3")
        resetAll()
    } else {
        if (delta > speed) {
            lastTime = time
            snake.update(directions);
        }
        start();
    }

}

function start() {
    requestId = window.requestAnimationFrame(main);
}

function stop() {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
}

function handleDir(e) {
    moveSound.play();
    prevDir = directions;
    if (e.key == 'ArrowLeft') directions = { x: -1, y: 0 }
    else if (e.key == 'ArrowRight') directions = { x: 1, y: 0 }
    else if (e.key == 'ArrowUp') directions = { x: 0, y: -1 }
    else directions = { x: 0, y: 1 }
    if ((prevDir.x != -1 * directions.x) || (prevDir.y != -1 * directions.y)) return;
    directions = prevDir;
}

function isCollision() {
    const headPos = { x: snake.snakeObj[0].x, y: snake.snakeObj[0].y };

    headPos.x += directions.x;
    headPos.y += directions.y;

    if (headPos.x > 19 || headPos.y > 19 || headPos.x < 0 || headPos.y < 0) {
        stop();
        return true;
    }
    for (let i = 0; i < snake.snakeObj.length; i++) {
        if (headPos.x == snake.snakeObj[i].x && headPos.y == snake.snakeObj[i].y) {
            stop();
            return true;
        }
    }

    return false;
}

function resetAll() {

    gameOverSound.play();
    snake.resetFood();
    snake.resetSnake();
    snake.resetScore();
    directions = { x: 0, y: 0 }
    prevDir = { x: 0, y: 0 }
    lastTime = 0;
    time = 0;
    snake.update(directions);
}



//wall collision