const MovingObject = require("./moving_object");
const Util = require("./utils");

const DEFAULTS = {
    RADIUS: 15,
    SPEED: 3
};

function Orb(pos, color) {
    let properties = {
        pos: pos,
        vel: Util.randomVec(DEFAULTS.SPEED),
        radius: DEFAULTS.RADIUS,
        color: color
    };

    MovingObject.call(this, properties);
}

Util.inherits(Orb, MovingObject);

Orb.prototype.move = function (gridCtx, gameCtx, playerPos) {
    //TODO: implement orb collision physics
    let newXPos = this.pos[0] + this.vel[0];
    let newYPos = this.pos[1] + this.vel[1];
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
    return ((isCollisionX || isCollisionY) && 
            (Math.abs(playerPos[0]-this.pos[0]) <= DEFAULTS.RADIUS ||
            Math.abs(playerPos[1]-this.pos[1]) <= DEFAULTS.RADIUS));
}

module.exports = Orb;