const Orb = require("./orb");

const DIM_X = 700;
const DIM_Y = 500;
const NUM_ORBS = 3;

function Game() {
    // call addOrbs()
    this.orbs = this.addOrbs();
}

Game.prototype.addOrbs = function () {
    // NUM_ORBS times: new orb
    let orbs = [];
    for (let i = 0; i < NUM_ORBS; i++) {
        orbs.push(new Orb(this.randomPosition()));
    }
    return orbs;
};

Game.prototype.randomPosition = function () {
    let randPosX = Math.floor(Math.random() * DIM_X);
    let randPosY = Math.floor(Math.random() * DIM_Y);
    return [randPosX, randPosY];
}

Game.prototype.draw = function (ctx) {
    // clearRect(ctx)
    // NUM_ORBS times: orb[i].draw(ctx)
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.orbs.forEach(function (orb) {
        orb.draw(ctx);
    });
}

Game.prototype.moveObjects = function () {
    // NUM_ORBS times: orb[i].move(ctx)
}

module.exports = Game;