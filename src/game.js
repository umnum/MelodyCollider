const Orb = require("./orb");
const Player = require("./player");

const DIM_X = 700;
const DIM_Y = 500;
const NUM_ORBS = 10;

function Game() {
    this.orbs = this.addOrbs();
    this.player = new Player(this.randomPosition());
}

Game.prototype.addOrbs = function () {
    let orbs = [];
    for (let i = 0; i < NUM_ORBS; i++) {
        orbs.push(new Orb(this.randomPosition()));
    }
    return orbs;
};

Game.prototype.allObjects = function () {
    return [this.player].concat(this.orbs);
}

Game.prototype.randomPosition = function () {
    let randPosX = Math.floor(40 + Math.random() * DIM_X * .6);
    let randPosY = Math.floor(40 + Math.random() * DIM_Y * .6);
    return [randPosX, randPosY];
}

Game.prototype.draw = function (gameCtx) {
    gameCtx.clearRect(0, 0, DIM_X, DIM_Y);
    this.allObjects().forEach(function (object) {
        object.draw(gameCtx);
    });
}

Game.prototype.moveObjects = function (gridCtx, gameCtx) {
    this.allObjects().forEach(function (object) {
        object.move(gridCtx, gameCtx);
    })
};

module.exports = Game;