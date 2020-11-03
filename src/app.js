const Game = require("./game");
const GameView = require("./game_view");

const game = new Game();

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext('2d');

    // continuously draw moving Orbs in Game
    const gameView = new GameView(game, ctx);
    gameView.start();
});

document.addEventListener('keyup', function (event) {game.player.direction(event.key)});