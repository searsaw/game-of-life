import { initSquareArray } from './helpers';
import { setUpGameBoard, startGame, stopGame } from './game-of-life';

const container = '#game';
const containerElement = document.querySelector(container);

let gameInterval = null;

let letsPlayButton = document.querySelector('#lets-play-button');
letsPlayButton.addEventListener('click', function(e) {
    let tickLength = parseInt(document.querySelector('#tick-length').value, 10);
    let numberOfTicks = parseInt(document.querySelector('#number-of-ticks').value, 10);
    let sideLength = parseInt(document.querySelector('#side-length').value, 10);

    let initialData = initSquareArray(sideLength);

    setUpGameBoard(containerElement.offsetWidth);
    startGame(container, initialData, tickLength);

    gameInterval = setTimeout(stopGame, tickLength * numberOfTicks);
});

let stopButton = document.querySelector('#stop-button');
stopButton.addEventListener('click', function(e) {
    stopGame();
    clearInterval(gameInterval);
    gameInterval = null;
    alert('The game has completed! Yay!');
});
