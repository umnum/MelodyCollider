const Orb = require("./orb");
const Player = require("./player");
const Tone = require("tone");

const DIM_X = 700;
const DIM_Y = 500;
const HEADER_DIM_X = 700;
const HEADER_DIM_Y = 100;

function Game() {
    this.player = new Player();
    this.orbs = [];
    this.currentLevel = 1;
    this.isIntroSequence = false;
    this.isMenu = false;
    this.isPaused = true;
    this.menuSelectState = {
        gameStart: true,
        gameAbout: false
    },
    this.pauseSelectState = {
        gameContinue: true
    }
    this.audioSelectState = {
        audioOn: true
    }
    this.orbColors = [];
}

Game.prototype.menuStart = function () {
    //this.levelStart('level ' + this.currentLevel);
    this.isMenu = true;
}

Game.prototype.isPlayingMenuScreen = function () {
    return this.isMenu;
}

Game.prototype.isGamePaused = function () {
    return this.isPaused;
}

Game.prototype.playMenuScreen = function (menuCtx) {
    this.drawMenu(menuCtx);
}

Game.prototype.toggleAudio = function () {
    Tone.Master.mute = this.audioSelectState.audioOn;
    this.audioSelectState.audioOn = !this.audioSelectState.audioOn;
}

Game.prototype.drawAudioIcon = function (audioCtx) {
    audioCtx.clearRect(0, 0, DIM_X, DIM_Y);
    if (this.audioSelectState.audioOn) {
        audioCtx.fillStyle = "black";
        audioCtx.beginPath();
        audioCtx.strokeStyle = "black";
        audioCtx.rect(10, 40, 20, 25)
        audioCtx.fill();
        audioCtx.beginPath();
        audioCtx.moveTo(10, 53);
        audioCtx.lineTo(53, 85);
        audioCtx.lineTo(53, 20);
        audioCtx.fill();
        audioCtx.beginPath();
        audioCtx.lineWidth = 5;
        audioCtx.ellipse(55, 50, 10, 12, 0, -.7, .7);
        audioCtx.stroke();
        audioCtx.beginPath();
        audioCtx.ellipse(70, 50, 10, 15, 0, -1, 1);
        audioCtx.stroke();
        audioCtx.beginPath();
        audioCtx.ellipse(85, 50, 10, 25, 0, -1.3, 1.3);
        audioCtx.stroke();
    }
    else {
        audioCtx.fillStyle = "gray";
        audioCtx.beginPath();
        audioCtx.strokeStyle = "gray";
        audioCtx.rect(10, 40, 20, 25)
        audioCtx.fill();
        audioCtx.beginPath();
        audioCtx.moveTo(10, 53);
        audioCtx.lineTo(53, 85);
        audioCtx.lineTo(53, 20);
        audioCtx.fill();
        audioCtx.beginPath();
        audioCtx.lineWidth = 5;
        audioCtx.ellipse(55, 50, 10, 12, 0, -.7, .7);
        audioCtx.stroke();
        audioCtx.beginPath();
        audioCtx.ellipse(70, 50, 10, 15, 0, -1, 1);
        audioCtx.stroke();
        audioCtx.beginPath();
        audioCtx.ellipse(85, 50, 10, 25, 0, -1.3, 1.3);
        audioCtx.stroke();
        audioCtx.beginPath();
        audioCtx.strokeStyle = "white";
        audioCtx.lineWidth = 15;
        audioCtx.moveTo(0, 100);
        audioCtx.lineTo(100, 0);
        audioCtx.stroke();
        audioCtx.beginPath();
        audioCtx.strokeStyle = "gray";
        audioCtx.lineWidth = 10;
        audioCtx.moveTo(15, 85);
        audioCtx.lineTo(80, 20);
        audioCtx.stroke();
    }
}

Game.prototype.drawMenu = function (menuCtx) {
    // draw menu screen
            menuCtx.clearRect(0, 0, DIM_X, DIM_Y);
            menuCtx.font = "100px Arial";
            menuCtx.fillText("Melody Collider", 10, 200);
            if (this.menuSelectState.gameStart) {
                menuCtx.font = "bold 50px Arial";
            }
            else {
                menuCtx.font = "50px Arial";
            }
            menuCtx.fillText("Start Game", 215, 300);
            if (this.menuSelectState.gameAbout) {
                menuCtx.font = "bold 50px Arial";
            }
            else {
                menuCtx.font = "50px Arial";
            }
            menuCtx.fillText("About Game", 200, 400);
}

Game.prototype.menuAction = function (action, menuCtx) {
    if (!this.isPlayingMenuScreen()) return null;
    
    switch (action) {
        case 'up':
        case 'down':
            this.menuSelectState.gameStart = !this.menuSelectState.gameStart;
            this.menuSelectState.gameAbout = !this.menuSelectState.gameStart;
            break;
        case 'select':
            menuCtx.clearRect(0, 0, DIM_X, DIM_Y);
            if (this.menuSelectState.gameStart) {
                this.isMenu = false;
                this.levelStart('level 1');
            }
            break;
    }
}

Game.prototype.pauseAction = function (action, pauseCtx, gameCtx, headerCtx, gridCtx, audioCtx) {
    if (this.isPlayingMenuScreen()) return null;
    switch (action) {
        case 'left':
        case 'right':
            if (this.isGamePaused()) {
                this.pauseSelectState.gameContinue = !this.pauseSelectState.gameContinue;
            }
            break;
        case 'select':
            pauseCtx.clearRect(0, 0, DIM_X, DIM_Y);
            gameCtx.clearRect(0, 0, DIM_X, DIM_Y);
            headerCtx.clearRect(0, 0, DIM_X, DIM_Y);
            gridCtx.clearRect(0, 0, DIM_X, DIM_Y);
            audioCtx.clearRect(0, 0, DIM_X, DIM_Y);
            this.isPaused = !this.isGamePaused();
            if (!this.pauseSelectState.gameContinue) {
                this.isPaused = true;
                this.isMenu = true;
                this.pauseSelectState.gameContinue = true;
                this.menuSelectState.gameStart = true;
                this.menuSelectState.gameAbout = false;
                this.currentLevel = 1;
                pauseCtx.clearRect(0, 0, DIM_X, DIM_Y);
            }
            break;
    }
}

Game.prototype.playPauseScreen = function (pauseCtx)  {
    this.drawPauseScreen(pauseCtx);
}

Game.prototype.drawPauseScreen = function (pauseCtx) {
    pauseCtx.clearRect(0, 0, DIM_X, DIM_Y);
    pauseCtx.font = "50px Arial";
    pauseCtx.fillText("Paused", 260, 150);
    pauseCtx.font = "50px Arial";
    pauseCtx.fillText("Continue?", 240, 250);
    if (this.pauseSelectState.gameContinue) {
        pauseCtx.font = "bold 50px Arial";
        pauseCtx.fillText("Yes", 255, 320);
        pauseCtx.font = "50px Arial";
        pauseCtx.fillText("No", 390, 320);
    }
    else {
        pauseCtx.font = "50px Arial";
        pauseCtx.fillText("Yes", 255, 320);
        pauseCtx.font = "bold 50px Arial";
        pauseCtx.fillText("No", 390, 320);
    }
}

Game.prototype.isPlayingIntroSequence = function () {
    return this.isIntroSequence;
}

Game.prototype.levelStart = function (level) {
    let orbPositions;
    switch (level) {
        case 'level 1':
            this.orbColors = ["red", "green", "blue"];
            orbPositions = [[100, 400], [300, 100] , [600, 200]];
            orbNotes = ["c4", "d4", "e4"]
            this.orbs = this.addOrbs(orbPositions, this.orbColors, orbNotes, 3);
            this.player.setPosition([100,100]);
            this.isIntroSequence = true;
            break;
        case 'level 2':
            this.orbColors = ["red", "green", "blue", "purple", "orange"];
            orbNotes = ["c4", "d4", "e4", "a4", "g4"];
            orbPositions = [[600, 80], [400, 100] , [100, 400], [300, 400], [550, 400]];
            this.orbs = this.addOrbs(orbPositions, this.orbColors, orbNotes, 5);
            this.player.setPosition([100,100]);
            break;
        case 'level 3':
            this.orbColors = ["red", "blue", "orange", "green", "orange", "green"];
            orbNotes = ["e4", "a4", "e5", "g4", "e5", "g4"];
            orbPositions = [[580, 80], [100, 400] , [200, 200], [300, 300], [400, 450], [600, 250]];
            this.orbs = this.addOrbs(orbPositions, this.orbColors, orbNotes, 6);
            this.player.setPosition([100, 100]);
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

Game.prototype.drawHeader = function (headerCtx) {
    headerCtx.clearRect(0, 0, HEADER_DIM_X, HEADER_DIM_Y);
    headerCtx.font = "50px Arial";
    headerCtx.fillText("Level " + this.currentLevel, 500, 65);
};

Game.prototype.drawGrid = function (gridCtx, level) {
    switch (level) {
        case 'level 1':
            gridCtx.clearRect(0, 0, DIM_X, DIM_Y);
            gridCtx.beginPath();
            gridCtx.strokeStyle = "black";
            gridCtx.fill();
            gridCtx.rect(10, 10, 680, 480)
            gridCtx.moveTo(200, 0);
            gridCtx.lineTo(200, 200);
            gridCtx.moveTo(680, 300);
            gridCtx.lineTo(380, 300);
            gridCtx.lineWidth = 20;
            gridCtx.stroke();
            break;
        case 'level 2':
            gridCtx.clearRect(0, 0, DIM_X, DIM_Y);
            gridCtx.beginPath();
            gridCtx.strokeStyle = "black";
            gridCtx.fill();
            gridCtx.rect(10, 10, 680, 480)
            gridCtx.moveTo(0, 150);
            gridCtx.lineTo(200, 150);
            gridCtx.moveTo(500, 20);
            gridCtx.lineTo(500, 190);
            gridCtx.moveTo(400, 200);
            gridCtx.lineTo(580, 200);
            gridCtx.moveTo(200, 300);
            gridCtx.lineTo(200, 680);
            gridCtx.lineWidth = 20;
            gridCtx.stroke();
            break;
        case 'level 3':
            gridCtx.clearRect(0, 0, DIM_X, DIM_Y);
            gridCtx.beginPath();
            gridCtx.strokeStyle = "black";
            gridCtx.fill();
            gridCtx.rect(10, 10, 680, 480)
            gridCtx.moveTo(20, 150);
            gridCtx.lineTo(100, 150);
            gridCtx.moveTo(300, 20);
            gridCtx.lineTo(300, 150);
            gridCtx.moveTo(400, 200);
            gridCtx.lineTo(580, 200);
            gridCtx.moveTo(450, 200);
            gridCtx.lineTo(450, 400);
            gridCtx.moveTo(200, 390);
            gridCtx.lineTo(450, 390);
            gridCtx.moveTo(200, 300);
            gridCtx.lineTo(200, 400);
            gridCtx.moveTo(500, 20);
            gridCtx.lineTo(500, 200);
            gridCtx.lineWidth = 20;
            gridCtx.stroke();
            break;
    }
}

Game.prototype.playIntroSequence = function (gameCtx, level) {
       let isFinishedAnimating = false;
       this.orbs.forEach(function (orb, idx) {
           isFinishedAnimating = orb.animateIntroSequence((idx+1)*50);
       });
       this.orbs.forEach(function (orb) {
           orb.draw(gameCtx);
       });
       this.player.draw(gameCtx);
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
            orb.synth.triggerAttackRelease(orb.note, "16n");
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