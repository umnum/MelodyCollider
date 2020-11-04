const Orb = require("./orb");
const Player = require("./player");

const DIM_X = 700;
const DIM_Y = 500;

function Game() {
    // Constructor must call this.menuStart()
    this.player = new Player();
    this.orbs = [];
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
            orbNotes = ["c4", "a4", "b4"]
            this.orbs = this.addOrbs(orbPositions, orbColors, orbNotes, 3);
            this.player.setPosition([400,400]);
            break;
        case 'level 2':
            orbColors = ["red", "green", "blue", "purple", "orange"];
            orbNotes = ["c4", "a4", "b4", "e4", "d4"];
            orbPositions = [[80, 80], [100, 100] , [200, 200], [300, 300], [400, 400]];
            this.orbs = this.addOrbs(orbPositions, orbColors, orbNotes, 5);
            this.player.setPosition([450,450]);
            break;
    }
}

Game.prototype.addOrbs = function (orbPositions, orbColors, orbNotes, numOrbs) {
    let orbs = [];
    for (i = 0; i < numOrbs; i++) {
        orbs.push(new Orb(orbPositions[i], orbColors[i], orbNotes[i]));
    }
    return orbs;
};

Game.prototype.removeOrb = function() {
    return this.orbs.shift();
}

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
    let isOrbRemoved = false;
    let that = this;
    this.orbs.forEach(function (orb) {
        isOrbRemoved = orb.move(gridCtx, gameCtx, that.player.getPosition());
        if (isOrbRemoved) {
            if (orb.color !== that.removeOrb().color) {
                that.levelStart('level 1')
            }
        }
    })
    if (this.orbs.length === 0) {
        that.levelStart('level 2');
    }
    this.player.move(gridCtx, gameCtx);
};

module.exports = Game;