const Orb = require("./orb");
const Player = require("./player");
const Tone = require("tone");

const DIM_X = 700;
const DIM_Y = 500;
const HEADER_DIM_X = 700;
const HEADER_DIM_Y = 100;

function Game() {
    this.player = new Player();
    this.playerWasSafe = false;
    this.orbs = [];
    this.currentLevel = 1;
    this.isIntroSequence = false;
    this.isSequence = false;
    this.isMenu = false;
    this.isAbout = false;
    this.isPaused = true;
    this.isWon = false;
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
    this.gridObstacles = {
        level4: {
            obs1: {
                moveRight: true,
                posFrom: [225, 166],
                posTo: [225, 333],
                xMin: 225,
                xMax: 475
            },
            obs2: {
                moveUp: false,
                posFrom: [0, 116],
                posTo: [235, 116],
                yMin: 166,
                yMax: 333
            },
            obs3: {moveUp: true,
                posFrom: [465, 333],
                posTo: [680, 333],
                yMin: 166,
                yMax: 333
            }
        }
    }
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

Game.prototype.isInsideSafetyZone = function () {
    return this.player.isSafe;
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
            if (this.isAbout) {
                menuCtx.font = "bold 25px Arial";
                menuCtx.fillText("Description", 0, 30);
                menuCtx.font = "20px Arial";
                menuCtx.fillText("Chaos reigns as colorful orbs randomly collide in a grid. " +
                                 "However, what unites", 0, 60);
                menuCtx.fillText("them all is melody. Navigate the grid as a gray orb and bring order to the orbs", 0, 90);
                menuCtx.fillText("by collecting them according to their melodic sequence.", 0, 120);
                menuCtx.font = "bold 25px Arial";
                menuCtx.fillText("Controls", 0, 165);
                menuCtx.font = "25px Arial";
                menuCtx.fillText("Up", 0, 200);
                menuCtx.fillText("Arrow Up", 250, 200);
                menuCtx.fillText("Down:", 0, 230);
                menuCtx.fillText("Arrow Down", 250, 230);
                menuCtx.fillText("Left:", 0, 260);
                menuCtx.fillText("Arrow Left", 250, 260);
                menuCtx.fillText("Right:", 0, 290);
                menuCtx.fillText("Arrow Right", 250, 290);
                menuCtx.fillText("Select:", 0, 320);
                menuCtx.fillText("Return/Enter", 250, 320);
                menuCtx.fillText("Pause/Unpause:", 0, 350);
                menuCtx.fillText("Return/Enter", 250, 350);
                menuCtx.fillText("Play Melody", 0, 380);
                menuCtx.fillText("Spacebar", 250, 380);
                menuCtx.fillText("Audio On/Off:", 0, 410);
                menuCtx.fillText("Press m or Click on Audio Icon", 250, 410);
                menuCtx.font = "bold 25px Arial";
                menuCtx.fillText("Developed By", 0, 455);
                menuCtx.font = "25px Arial";
                menuCtx.fillText("Michael Castanieto", 0, 490);
            }
            else {
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
}

Game.prototype.menuAction = function (action, menuCtx) {
    if (!this.isPlayingMenuScreen()) return null;
    
    switch (action) {
        case 'up':
        case 'down':
            if (!this.isAbout) {
                this.menuSelectState.gameStart = !this.menuSelectState.gameStart;
                this.menuSelectState.gameAbout = !this.menuSelectState.gameStart;
            }
            break;
        case 'select':
            menuCtx.clearRect(0, 0, DIM_X, DIM_Y);
            if (this.menuSelectState.gameStart) {
                this.isMenu = false;
                this.levelStart('level 1');
            }
            if (this.menuSelectState.gameAbout) {
                this.isAbout = !this.isAbout;
            }
            break;
    }
}

Game.prototype.pauseAction = function (action, pauseCtx, gameCtx, headerCtx, gridCtx, safetyZoneCtx, instructionsCtx, audioCtx) {
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
            safetyZoneCtx.clearRect(0, 0, DIM_X, DIM_Y);
            instructionsCtx.clearRect(0, 0, DIM_X, DIM_Y);
            this.isPaused = !this.isGamePaused();
            if (!this.pauseSelectState.gameContinue || this.isWon) {
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

Game.prototype.isPlayingSequence = function () {
    return this.isSequence;
}

Game.prototype.levelStart = function (level) {
    let orbPositions;
    this.player.notes = [];
    this.player.colors = [];
    this.player.orbSequence = [];
    this.isWon = false;
    switch (level) {
        case 'level 1':
            this.orbColors = ["red", "green", "blue"];
            orbPositions = [[100, 100], [300, 100] , [600, 200]];
            orbNotes = ["c4", "d4", "e4"]
            this.orbs = this.addOrbs(orbPositions, this.orbColors, orbNotes, 3);
            this.player.setPosition([100,360]);
            this.isIntroSequence = true;
            break;
        case 'level 2':
            this.orbColors = ["red", "green", "blue", "purple", "orange"];
            orbNotes = ["c4", "d4", "e4", "a4", "g4"];
            orbPositions = [[400, 280], [400, 100] , [100, 400], [300, 400], [550, 400]];
            this.orbs = this.addOrbs(orbPositions, this.orbColors, orbNotes, 5);
            this.player.setPosition([100,100]);
            break;
        case 'level 3':
            this.orbColors = ["red", "blue", "orange", "green", "orange", "green"];
            orbNotes = ["e4", "a4", "e5", "g4", "e5", "g4"];
            orbPositions = [[580, 80], [100, 400] , [200, 200], [400, 300], [500, 450], [600, 250]];
            this.orbs = this.addOrbs(orbPositions, this.orbColors, orbNotes, 6);
            this.player.setPosition([100, 100]);
            break;
        case 'level 4':
            this.orbColors = ["green", "blue", "brown", "brown", "blue", "green", "pink", "green", "blue", "blue"];
            orbNotes = ["g#4", "a4", "b4", "b4", "a4", "g#4", "f#4", "g#4", "a4", "a4"];
            orbPositions = [[580, 80], [100, 400] , [200, 200], [300, 300], [400, 450], 
                            [600, 250], [525, 450], [400, 350], [300, 350], [300, 100]];
            this.orbs = this.addOrbs(orbPositions, this.orbColors, orbNotes, 10);
            this.player.setPosition([100, 100]);
            break;
        case 'level 5':
            this.orbColors = [];
            this.orbNotes = [];
            this.orbPositions = [];
            this.orbs = [];
            this.isWon = true;
            this.player.setPosition([DIM_X+100, DIM_Y+100]);
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
    // rearrange orbs to their correct sequence
    for (let i = 0; i < this.orbs.length - 1; i++) {
        if (this.orbs[i].color !== this.orbColors[i+1]) {
            for (let j = i+1; j < this.orbs.length; j++) {
                if (this.orbs[j].color === this.orbColors[i+1]) {
                    [this.orbs[i], this.orbs[j]] = [this.orbs[j], this.orbs[i]];
                    break;
                }
            }
        }
    }
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

Game.prototype.drawGrid = function (gridCtx, level, headerCtx, audioCtx) {
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
        case 'level 4':
            let {level4} = this.gridObstacles;
            gridCtx.clearRect(0, 0, DIM_X, DIM_Y);
            gridCtx.beginPath();
            gridCtx.strokeStyle = "black";
            gridCtx.fill();
            gridCtx.rect(10, 10, 680, 480)
            gridCtx.moveTo(225, 0);
            gridCtx.lineTo(225, 166);
            gridCtx.moveTo(225, 333);
            gridCtx.lineTo(225, 500);
            gridCtx.moveTo(475, 0);
            gridCtx.lineTo(475, 166);
            gridCtx.moveTo(475, 333);
            gridCtx.lineTo(475, 500);
            if (level4.obs1.posFrom[0] > level4.obs1.xMax) {
                level4.obs1.moveRight = false;
            }
            if (level4.obs1.posFrom[0] < level4.obs1.xMin) {
                level4.obs1.moveRight = true;
            }
            if (level4.obs2.posFrom[1] > level4.obs2.yMax) {
                level4.obs2.moveUp = true;
            }
            if (level4.obs2.posFrom[1] < level4.obs2.yMin) {
                level4.obs2.moveUp = false;
            }
            if (level4.obs3.posFrom[1] > level4.obs3.yMax) {
                level4.obs3.moveUp = true;
            }
            if (level4.obs3.posFrom[1] < level4.obs3.yMin) {
                level4.obs3.moveUp = false;
            }
            if(level4.obs1.moveRight) {
                level4.obs1.posFrom[0] += 2;
                level4.obs1.posTo[0] += 2;
            }
            else {
                level4.obs1.posFrom[0] -= 2;
                level4.obs1.posTo[0] -= 2;
            }
            if(level4.obs2.moveUp) {
                level4.obs2.posFrom[1] -= 2;
                level4.obs2.posTo[1] -= 2;
            }
            else {
                level4.obs2.posFrom[1] += 2;
                level4.obs2.posTo[1] += 2;
            }
            if(level4.obs3.moveUp) {
                level4.obs3.posFrom[1] -= 2;
                level4.obs3.posTo[1] -= 2;
            }
            else {
                level4.obs3.posFrom[1] += 2;
                level4.obs3.posTo[1] += 2;
            }
            gridCtx.moveTo(level4.obs1.posFrom[0], level4.obs1.posFrom[1]);
            gridCtx.lineTo(level4.obs1.posTo[0], level4.obs1.posTo[1]);
            gridCtx.moveTo(level4.obs2.posFrom[0], level4.obs2.posFrom[1]);
            gridCtx.lineTo(level4.obs2.posTo[0], level4.obs2.posTo[1]);
            gridCtx.moveTo(level4.obs3.posFrom[0], level4.obs3.posFrom[1]);
            gridCtx.lineTo(level4.obs3.posTo[0], level4.obs3.posTo[1]);
            gridCtx.lineWidth = 20;
            gridCtx.stroke();
            break;
        case 'level 5':
            headerCtx.clearRect(0, 0, DIM_X, DIM_Y);
            audioCtx.clearRect(0, 0, DIM_X, DIM_Y);
            gridCtx.clearRect(0, 0, DIM_X, DIM_Y);
            gridCtx.font = "bold 100px Arial";
            gridCtx.fillText("You Won!", 150, 150);
            gridCtx.font = "50px Arial";
            gridCtx.fillText("Stay tuned for more levels...", 80, 280);
            gridCtx.font = "50px Arial";
            gridCtx.fillText("Press            to return", 150, 380);
            gridCtx.fillText("to the menu screen", 180, 430);
            gridCtx.font = "bold 50px Arial";
            gridCtx.fillText("enter", 300, 380);
            break;
    }
}

Game.prototype.drawSafetyZone = function (safetyZoneCtx, instructionsCtx, level) {
    safetyZoneCtx.clearRect(0, 0, DIM_X, DIM_Y);
    instructionsCtx.clearRect(0, 0, DIM_X, DIM_Y);
    switch (level) {
        case 'level 1':
            safetyZoneCtx.fillStyle = "magenta";
            safetyZoneCtx.beginPath();
            safetyZoneCtx.rect(585, 310, 100, 100);
            safetyZoneCtx.fill();
            safetyZoneCtx.font = "30px Arial";
            safetyZoneCtx.fillStyle = "black";
            safetyZoneCtx.fillText("Safety", 590, 350);
            safetyZoneCtx.fillText("Zone", 595, 390);
            // TODO: add Safety Zone instructions
            if (!this.player.isSafe) {
                instructionsCtx.font = "30px Arial";
                instructionsCtx.fillText("Move the gray", 170, 350);
                instructionsCtx.fillText("orb to safety!", 180, 380);
                instructionsCtx.lineWidth = 3;
                instructionsCtx.beginPath();
                instructionsCtx.moveTo(400, 360);
                instructionsCtx.lineTo(500, 360);
                instructionsCtx.stroke();
                instructionsCtx.beginPath();
                instructionsCtx.moveTo(480, 340);
                instructionsCtx.lineTo(500, 360);
                instructionsCtx.stroke();
                instructionsCtx.beginPath();
                instructionsCtx.moveTo(480, 380);
                instructionsCtx.lineTo(500, 360);
                instructionsCtx.stroke();
            }
            else if (this.player.isSafe && !this.isPlayingSequence()) {
                instructionsCtx.font = "30px Arial";
                instructionsCtx.fillText("While in a Safety Zone,", 170, 370);
                instructionsCtx.fillText("press", 170, 400);
                instructionsCtx.font = "bold 30px Arial";
                instructionsCtx.fillText("spacebar", 255, 400);
                instructionsCtx.font = "30px Arial";
                instructionsCtx.fillText("to hear ", 395, 400);
                instructionsCtx.fillText("the orbs play their melody", 170, 430);
            }
            else {
                instructionsCtx.font = "30px Arial";
                instructionsCtx.fillText("Collect the orbs in", 170, 370);
                instructionsCtx.fillText("the sequence played", 170, 400);
            }
            break;
        case 'level 2':
            safetyZoneCtx.fillStyle = "magenta";
            safetyZoneCtx.beginPath();
            safetyZoneCtx.rect(589, 20, 100, 100);
            safetyZoneCtx.fill();
            safetyZoneCtx.font = "30px Arial";
            safetyZoneCtx.fillStyle = "black";
            safetyZoneCtx.fillText("Safety", 590, 60);
            safetyZoneCtx.fillText("Zone", 595, 100);
            break;
        case 'level 3':
            safetyZoneCtx.fillStyle = "magenta";
            safetyZoneCtx.beginPath();
            safetyZoneCtx.rect(390, 20, 100, 100);
            safetyZoneCtx.fill();
            safetyZoneCtx.font = "30px Arial";
            safetyZoneCtx.fillStyle = "black";
            safetyZoneCtx.fillText("Safety", 400, 60);
            safetyZoneCtx.fillText("Zone", 405, 100);
            break;
        case 'level 4':
            safetyZoneCtx.fillStyle = "magenta";
            safetyZoneCtx.beginPath();
            safetyZoneCtx.rect(585, 380, 100, 100);
            safetyZoneCtx.fill();
            safetyZoneCtx.font = "30px Arial";
            safetyZoneCtx.fillStyle = "black";
            safetyZoneCtx.fillText("Safety", 590, 425);
            safetyZoneCtx.fillText("Zone", 595, 455);
            break;
    }
}

Game.prototype.playIntroSequence = function (gameCtx, level) {
       let isFinishedAnimating = false;
       this.orbs.forEach(function (orb, idx) {
           isFinishedAnimating = orb.animateSequence((idx+1)*50);
       });
       if (isFinishedAnimating) {
           this.orbs.forEach(function (orb) {
               orb.audioCountdown = -1;
           })
       }
       this.orbs.forEach(function (orb) {
           orb.draw(gameCtx);
       });
       this.player.draw(gameCtx);
       this.isIntroSequence = !isFinishedAnimating;
}

Game.prototype.playSequence = function (gameCtx, level) {
        let isFinishedAnimating = false;
        this.player.playSequence(50);
        let that = this;
       this.orbs.forEach(function (orb, idx) {
           let count = (idx + that.player.notes.length)*50 + 1;
           isFinishedAnimating = orb.animateSequence(count);
       });
       if (isFinishedAnimating) {
           this.orbs.forEach(function (orb) {
               orb.audioCountdown = -1;
           })
           this.player.sequenceCount = 0;
           this.player.audioCountdown= 0;
       }
       this.allObjects().forEach(function (object) {
           object.draw(gameCtx);
       })
       this.isSequence = !isFinishedAnimating;
}

Game.prototype.stopSequence = function () {
    this.isSequence = false; 
    this.orbs.forEach(function(orb) {
        orb.audioCountdown = -1; 
        orb.color = orb.orgColor
    }); 
    this.player.color = this.player.orgColor; 
    this.player.audioCountdown = 0; 
    this.player.sequenceCount = 0;
    this.player.colors = [];
    this.player.notes = [];
    let that = this
    this.player.orbSequence.forEach(function(orb) {
        that.player.colors.push(orb.color);
        that.player.notes.push(orb.note);
    });
}

Game.prototype.moveObjects = function (gridCtx, gameCtx, safetyZoneCtx) {
    let isOrbRemoved = false;
    let that = this;
    this.orbs.forEach(function (orb, idx) {
        isOrbRemoved = orb.move(gridCtx, gameCtx, safetyZoneCtx, that.player.getPosition());
        if (isOrbRemoved) {
            let removedOrb = that.removeOrb(idx);
            that.player.orbSequence.push(removedOrb);
            that.player.notes.push(removedOrb.note);
            that.player.colors.push(removedOrb.color);
            let removedOrbColor = removedOrb.orgColor;
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
    this.player.move(gridCtx, gameCtx, safetyZoneCtx);
    if (this.playerWasSafe && !this.player.isSafe && this.isPlayingSequence()) {
        this.stopSequence();
    }
    this.playerWasSafe = this.player.isSafe
};

module.exports = Game;