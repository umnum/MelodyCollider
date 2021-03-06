const MovingObject = require("./moving_object");
const Util = require("./utils");

const DEFAULTS = {
    RADIUS: 16,
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

    this.audioCountdown = -1;
    this.visualCountdown = -1;
    this.note = note;
    this.orgColor = this.color;
    this.flashColor = "magenta";
}

Util.inherits(Orb, MovingObject);

Orb.prototype.move = function (gridCtx, gameCtx, safetyZoneCtx, playerPos) {
    let newXPos = this.pos[0] + this.vel[0];
    let newYPos = this.pos[1] + this.vel[1];
    let hasCollided = (Math.sqrt(Math.pow(playerPos[0] - newXPos, 2) +
                                 Math.pow(playerPos[1] - newYPos, 2)) < DEFAULTS.RADIUS*2 + 4);
            if (hasCollided) {
                return hasCollided;
            };
    // only need to check orb's image border edge that faces the direction of the collision
    let gridImageDataX, gridImageDataY, 
        gameImageDataX, gameImageDataY,
        safetyZoneImageDataX, safetyZoneImageDataY;
    if (this.vel[0] < 0) {
        gridImageDataX = gridCtx.getImageData(newXPos - DEFAULTS.RADIUS, this.pos[1] - DEFAULTS.RADIUS, 1, 2*DEFAULTS.RADIUS).data
        gameImageDataX = gameCtx.getImageData(newXPos - DEFAULTS.RADIUS, this.pos[1] - DEFAULTS.RADIUS, 1, 2*DEFAULTS.RADIUS).data
        safetyZoneImageDataX = safetyZoneCtx.getImageData(newXPos - DEFAULTS.RADIUS, this.pos[1] - DEFAULTS.RADIUS, 1, 2*DEFAULTS.RADIUS).data
    }
    else {
        gridImageDataX = gridCtx.getImageData(newXPos + DEFAULTS.RADIUS, this.pos[1] - DEFAULTS.RADIUS, 1, 2*DEFAULTS.RADIUS).data
        gameImageDataX = gameCtx.getImageData(newXPos + DEFAULTS.RADIUS, this.pos[1] - DEFAULTS.RADIUS, 1, 2*DEFAULTS.RADIUS).data
        safetyZoneImageDataX = safetyZoneCtx.getImageData(newXPos + DEFAULTS.RADIUS, this.pos[1] - DEFAULTS.RADIUS, 1, 2*DEFAULTS.RADIUS).data
    }
    if (this.vel[1] < 0) {
        gridImageDataY = gridCtx.getImageData(this.pos[0] - DEFAULTS.RADIUS, newYPos - DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS, 1).data
        gameImageDataY = gameCtx.getImageData(this.pos[0] - DEFAULTS.RADIUS, newYPos - DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS, 1).data
        safetyZoneImageDataY = safetyZoneCtx.getImageData(this.pos[0] - DEFAULTS.RADIUS, newYPos - DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS, 1).data
    }
    else {
        gridImageDataY = gridCtx.getImageData(this.pos[0] - DEFAULTS.RADIUS, newYPos + DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS, 1).data
        gameImageDataY = gameCtx.getImageData(this.pos[0] - DEFAULTS.RADIUS, newYPos + DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS, 1).data
        safetyZoneImageDataY = safetyZoneCtx.getImageData(this.pos[0] - DEFAULTS.RADIUS, newYPos + DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS, 1).data
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
    for (let i = 0; i < safetyZoneImageDataX.length; i+=3) {
        if (safetyZoneImageDataX[i] > 0) {
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
    for (let i = 0; i < safetyZoneImageDataY.length; i+=3) {
        if (safetyZoneImageDataY[i] > 0) {
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

Orb.prototype.animateSequence = function (count) {
    let isFinishedAnimating = false;
    if (this.audioCountdown === -1) {
        this.audioCountdown = count
        this.color = this.orgColor;
    }
    if (this.audioCountdown === 1) {
        this.visualCountdown = 16;
        this.synth.triggerAttackRelease(this.note, "16n");
        this.isFlashing = true;
    }
    if (this.visualCountdown === 1) {
        this.color = this.orgColor;
        this.isFlashing = false;
        this.imgFrame = 0;
        isFinishedAnimating = true;
    }
    if (this.audioCountdown !== 0) {
        this.audioCountdown--;
    }
    if (this.visualCountdown > 0) {
        this.visualCountdown--;
    }
    return isFinishedAnimating;
}

module.exports = Orb;