const Game = require("./game");
const GameView = require("./game_view");

const game = new Game();

document.addEventListener("DOMContentLoaded", function () {
    const gameCanvas = document.getElementById("game-canvas");
    const gridCanvas = document.getElementById("grid-canvas");
    const gameCtx = gameCanvas.getContext('2d');
    const gridCtx = gridCanvas.getContext('2d');

    // continuously draw moving Orbs in Game
    const gameView = new GameView(game, gameCtx, gridCtx);
    gameView.start();
});

document.addEventListener('keyup', function (event) {game.player.direction(event.key)});