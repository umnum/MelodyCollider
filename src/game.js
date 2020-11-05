const Orb = require("./orb");
const Player = require("./player");

const DIM_X = 700;
const DIM_Y = 500;

function Game() {
    this.player = new Player();
    this.orbs = [];
    this.currentLevel = 1;
    this.isIntroSequence = false;
    this.orbColors = [];
}

Game.prototype.menuStart = function () {
    // set up Menu Screen
}

Game.prototype.isPlayingIntroSequence = function () {
    return this.isIntroSequence;
}

Game.prototype.levelStart = function (level) {
    let orbPositions;
    switch (level) {
        case 'level 1':
            this.orbColors = ["red", "green", "blue"];
            orbPositions = [[80, 80], [100, 100] , [200, 200]];
            orbNotes = ["c4", "d4", "e4"]
            this.orbs = this.addOrbs(orbPositions, this.orbColors, orbNotes, 3);
            this.player.setPosition([400,400]);
            this.isIntroSequence = true;
            break;
        case 'level 2':
            this.orbColors = ["red", "green", "blue", "purple", "orange"];
            orbNotes = ["c4", "d4", "e4", "a4", "g4"];
            orbPositions = [[80, 80], [100, 100] , [200, 200], [300, 300], [400, 400]];
            this.orbs = this.addOrbs(orbPositions, this.orbColors, orbNotes, 5);
            this.player.setPosition([450,450]);
            break;
        case 'level 3':
            this.orbColors = ["red", "blue", "orange", "green", "orange", "green"];
            orbNotes = ["e4", "a4", "e5", "g4", "e5", "g4"];
            orbPositions = [[80, 80], [100, 100] , [200, 200], [300, 300], [400, 400], [200, 250]];
            this.orbs = this.addOrbs(orbPositions, this.orbColors, orbNotes, 6);
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

Game.prototype.removeOrb = function(orbIndex) {
    let removedOrb = this.orbs[orbIndex]
    this.orbs = this.orbs.slice(0,orbIndex).concat(this.orbs.slice(orbIndex+1));
    return removedOrb;
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

Game.prototype.playIntroSequence = function (gameCtx, level) {
       let isFinishedAnimating = false;
       this.orbs.forEach(function (orb, idx) {
           isFinishedAnimating = orb.animate((idx+1)*50);
       });
       this.orbs.forEach(function (orb) {
           orb.draw(gameCtx);
       });
       this.isIntroSequence = !isFinishedAnimating;
}

Game.prototype.moveObjects = function (gridCtx, gameCtx) {
    let isOrbRemoved = false;
    let that = this;
    this.orbs.forEach(function (orb, idx) {
        isOrbRemoved = orb.move(gridCtx, gameCtx, that.player.getPosition());
        if (isOrbRemoved) {
            let removedOrbColor = that.removeOrb(idx).orgColor;
            let targetOrbColor = that.orbColors.shift();
            if (removedOrbColor !== targetOrbColor) {
                let repeatLevel = 'level ' + that.currentLevel;
                that.levelStart(repeatLevel)
                that.isIntroSequence = true;
            }
        }
    })
    if (this.orbs.length === 0) {
        this.currentLevel++;
        let nextLevel = 'level ' + this.currentLevel;
        this.levelStart(nextLevel);
        this.isIntroSequence = true;
    }
    this.player.move(gridCtx, gameCtx);
};

module.exports = Game;