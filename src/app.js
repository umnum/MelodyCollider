const Game = require("./game");

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext('2d');

    // draw Orbs in Game
    const game = new Game();
    game.draw(ctx);
});