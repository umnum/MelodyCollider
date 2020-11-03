const Orb = require("./orb");
const Player = require("./player");

const DIM_X = 700;
const DIM_Y = 500;
const NUM_ORBS = 3;

function Game() {
    // call addOrbs()
    this.orbs = this.addOrbs();
    this.player = new Player(this.randomPosition());
}

Game.prototype.addOrbs = function () {
    // NUM_ORBS times: new orb
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
    let randPosX = Math.floor(Math.random() * DIM_X);
    let randPosY = Math.floor(Math.random() * DIM_Y);
    return [randPosX, randPosY];
}

Game.prototype.draw = function (ctx) {
    // clearRect(ctx)
    // NUM_ORBS times: orb[i].draw(ctx)
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.allObjects().forEach(function (object) {
        object.draw(ctx);
    });
}

Game.prototype.moveObjects = function () {
    // NUM_ORBS times: orb[i].move(ctx)
    this.allObjects().forEach(function (object) {
        object.move();
    })
};

Game.prototype.movePlayer = function (gridCtx) {
    // Player's center pixel position has collided with the grid walls
    this.player.move(gridCtx);
}

module.exports = Game;