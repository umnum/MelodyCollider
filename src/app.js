const Game = require("./game");
const GameView = require("./game_view");
const Tone = require("tone");

const game = new Game();

document.addEventListener("DOMContentLoaded", function () {
    const gameCanvas = document.getElementById("game-canvas");
    const gridCanvas = document.getElementById("grid-canvas");
    const menuCanvas = document.getElementById("menu-canvas");
    const headerCanvas = document.getElementById("header-canvas");
    const pauseCanvas = document.getElementById("pause-canvas");
    const gameCtx = gameCanvas.getContext('2d');
    const gridCtx = gridCanvas.getContext('2d');
    const menuCtx = menuCanvas.getContext('2d');
    const headerCtx = headerCanvas.getContext('2d');
    const pauseCtx = pauseCanvas.getContext('2d');

    // continuously draw moving Orbs in Game
    const gameView = new GameView(game, 
                                  gameCtx, 
                                  gridCtx, 
                                  menuCtx, 
                                  headerCtx, 
                                  pauseCtx);
    gameView.start();
});

document.addEventListener('keyup', function (event) {game.player.direction(event.key)});

document.addEventListener('mousedown', async function () {
    await Tone.start()
})

document.addEventListener('keydown', async function () {
    await Tone.start()
})