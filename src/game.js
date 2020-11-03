const Orb = require("./orb");
const Player = require("./player");

const DIM_X = 700;
const DIM_Y = 500;
const NUM_ORBS = 3;

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
    let randPosX = Math.floor(20 + Math.random() * DIM_X * .8);
    let randPosY = Math.floor(20 + Math.random() * DIM_Y * .8);
    return [randPosX, randPosY];
}

Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.allObjects().forEach(function (object) {
        object.draw(ctx);
    });
}

Game.prototype.moveObjects = function (gridCtx) {
    this.allObjects().forEach(function (object) {
        object.move(gridCtx);
    })
};

module.exports = Game;