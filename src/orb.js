const MovingObject = require("./moving_object");
const Util = require("./utils");
const Tone = require("tone");

const DEFAULTS = {
    RADIUS: 15,
    SPEED: 3
};

function Orb(pos, color, note) {
    let properties = {
        pos: pos,
        vel: Util.randomVec(DEFAULTS.SPEED),
        radius: DEFAULTS.RADIUS,
        color: color
    };

    MovingObject.call(this, properties);

    // play note at random intervals between 5 and 20 frames
    this.audioCountdown = 100 + Math.floor(Math.random()*100); 
    this.visualCountdown = 0;
    this.note = note;
    this.orgColor = this.color;
    this.flashColor = "magenta";
    this.synth = new Tone.AMSynth({
        harmonicity: 3/1,
        detune: 0,
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.01,
            decay: 0.1,
            sustain: 0.5,
            release: 0.7,
        },
        modulation: {
            type: "sine"
        },
        modulationEnvelope: {
            attack: 0.05,
            decay: 0.1,
            sustain: 1,
            release: 0.5
        }
    }).toDestination();
}

Util.inherits(Orb, MovingObject);

Orb.prototype.move = function (gridCtx, gameCtx, playerPos) {
    if (this.audioCountdown === 0) {
        this.audioCountdown = 100 + Math.floor(Math.random()*100);
        this.synth.triggerAttackRelease(this.note, "16n");
        this.visualCountdown = 20;
        this.color = this.flashColor;
    }
    this.audioCountdown--;
    if (this.visualCountdown > 0) {
        this.visualCountdown--;
    }
    else if (this.visualCountdown === 0) {
        this.color = this.orgColor;
    }
    let newXPos = this.pos[0] + this.vel[0];
    let newYPos = this.pos[1] + this.vel[1];
    let hasCollided = (Math.sqrt(Math.pow(playerPos[0] - newXPos, 2) +
                                 Math.pow(playerPos[1] - newYPos, 2)) < DEFAULTS.RADIUS*2 + 4);
            if (hasCollided) {
                return hasCollided;
            };
    // only need to check orb's image border edge that faces the direction of the collision
    let gridImageDataX, gridImageDataY, gameImageDataX, gameImageDataY;
    if (this.vel[0] < 0) {
        gridImageDataX = gridCtx.getImageData(newXPos - DEFAULTS.RADIUS, this.pos[1] - DEFAULTS.RADIUS, 1, 2*DEFAULTS.RADIUS).data
        gameImageDataX = gameCtx.getImageData(newXPos - DEFAULTS.RADIUS, this.pos[1] - DEFAULTS.RADIUS, 1, 2*DEFAULTS.RADIUS).data
    }
    else {
        gridImageDataX = gridCtx.getImageData(newXPos + DEFAULTS.RADIUS, this.pos[1] - DEFAULTS.RADIUS, 1, 2*DEFAULTS.RADIUS).data
        gameImageDataX = gameCtx.getImageData(newXPos + DEFAULTS.RADIUS, this.pos[1] - DEFAULTS.RADIUS, 1, 2*DEFAULTS.RADIUS).data
    }
    if (this.vel[1] < 0) {
        gridImageDataY = gridCtx.getImageData(this.pos[0] - DEFAULTS.RADIUS, newYPos - DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS, 1).data
        gameImageDataY = gameCtx.getImageData(this.pos[0] - DEFAULTS.RADIUS, newYPos - DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS, 1).data
    }
    else {
        gridImageDataY = gridCtx.getImageData(this.pos[0] - DEFAULTS.RADIUS, newYPos + DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS, 1).data
        gameImageDataY = gameCtx.getImageData(this.pos[0] - DEFAULTS.RADIUS, newYPos + DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS, 1).data
    }
    let isCollisionX = false; // check grid's Alpha channel for collision with Player along x-axis
    let isCollisionY = false; // check grid's Alpha channel for collision with Player along y-axis
    for (let i = 0; i < gridImageDataX.length; i+=3) {
        if (gridImageDataX[i] > 0) {
            isCollisionX = true;
            break;
        }
    }
    for (let i = 0; i < gameImageDataX.length; i+=3) {
        if (gameImageDataX[i] > 0) {
            isCollisionX = true;
            break;
        }
    }
    for (let i = 0; i < gridImageDataY.length; i+=3) {
        if (gridImageDataY[i] > 0) {
            isCollisionY = true;
            break;
        }
    }
    for (let i = 0; i < gameImageDataY.length; i+=3) {
        if (gameImageDataY[i] > 0) {
            isCollisionY = true;
            break;
        }
    }
    if (isCollisionX) {
        this.vel[0] *= -1;
    }
    else {
        newXPos = this.pos[0] + this.vel[0];
        this.pos[0] = newXPos;
    }

    if (isCollisionY) {
        this.vel[1] *= -1;
    }
    else {
        newYPos = this.pos[1] + this.vel[1];
        this.pos[1] = newYPos;
    }
}

module.exports = Orb;