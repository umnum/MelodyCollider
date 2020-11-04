const Orb = require("./orb");
const Player = require("./player");

const DIM_X = 700;
const DIM_Y = 500;

function Game() {
    // Constructor must call this.menuStart()
    this.player = new Player();
}

Game.prototype.menuStart = function () {
    // set up Menu Screen
}

Game.prototype.levelStart = function (level) {
    let orbColors, orbPositions;
    switch (level) {
        case 'level 1':
            orbColors = ["red", "green", "blue"];
            orbPositions = [[80, 80], [100, 100] , [200, 200]];
            this.orbs = this.addOrbs(orbPositions, orbColors, 3);
            this.player.position([50,50]);
            break;
        case 'level 2':
            orbColors = ["red", "green", "blue", "purple", "orange"];
            orbPositions = [[80, 80], [100, 100] , [200, 200], [300, 300], [400, 400]];
            this.orbs = this.addOrbs(orbPositions, orbColors, 5);
            this.player.position([150,150]);
            break;
    }
}

Game.prototype.addOrbs = function (orbPositions, orbColors, numOrbs) {
    let orbs = [];
    for (i = 0; i < numOrbs; i++) {
        orbs.push(new Orb(orbPositions[i], orbColors[i]));
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