const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext('2d');

    const game = new Game();

    // continuously draw moving Orbs in Game
    const gameView = new GameView(game, ctx);
    gameView.start();
});