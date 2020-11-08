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
    const audioCanvas = document.getElementById("audio-canvas");
    const safetyZoneCanvas = document.getElementById("safety-zone-canvas");
    const instructionsCanvas = document.getElementById("instructions-canvas");
    const gameCtx = gameCanvas.getContext('2d');
    const gridCtx = gridCanvas.getContext('2d');
    const menuCtx = menuCanvas.getContext('2d');
    const headerCtx = headerCanvas.getContext('2d');
    const pauseCtx = pauseCanvas.getContext('2d');
    const audioCtx = audioCanvas.getContext('2d');
    const safetyZoneCtx = safetyZoneCanvas.getContext('2d');
    const instructionsCtx = instructionsCanvas.getContext('2d');

    audioCanvas.addEventListener("click", function (event) {game.toggleAudio()})

    // continuously draw moving Orbs in Game
    const gameView = new GameView(game, 
                                  gameCtx, 
                                  gridCtx, 
                                  safetyZoneCtx, 
                                  instructionsCtx, 
                                  menuCtx, 
                                  headerCtx, 
                                  pauseCtx,
                                  audioCtx);
    gameView.start();
});

document.addEventListener('keyup', function (event) {game.player.direction(event.key)});

document.addEventListener('mousedown', async function () {
    await Tone.start()
})

document.addEventListener('keydown', async function () {
    await Tone.start()
})