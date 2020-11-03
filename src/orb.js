const MovingObject = require("./moving_object");
const Util = require("./utils");

const DEFAULTS = {
    COLOR: "red",
    RADIUS: 15,
    SPEED: 3
};

function Orb(pos) {
    let properties = {
        pos: pos,
        vel: Util.randomVec(DEFAULTS.SPEED),
        radius: DEFAULTS.RADIUS,
        color: DEFAULTS.COLOR
    };

    MovingObject.call(this, properties);
}

Util.inherits(Orb, MovingObject);

Orb.prototype.move = function (gridCtx) {
    //TODO: implement wall collision physics
    let newXPos = this.pos[0] + this.vel[0];
    let newYPos = this.pos[1] + this.vel[1];
    let imageDataX = gridCtx.getImageData(newXPos - DEFAULTS.RADIUS, this.pos[1] - DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS).data
    let imageDataY = gridCtx.getImageData(this.pos[0] - DEFAULTS.RADIUS, newYPos - DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS, 2*DEFAULTS.RADIUS).data
    // check x-y collisions seperately, to allow smooth sliding along grid walls
    let isCollisionX = false; // check grid's Alpha channel for collision with Player along x-axis
    let isCollisionY = false; // check grid's Alpha channel for collision with Player along y-axis
    for (let i = 0; i < imageDataX.length; i+=3) {
        if (imageDataX[i] > 0) {
            isCollisionX = true;
            break;
        }
    }
    for (let i = 0; i < imageDataY.length; i+=3) {
        if (imageDataY[i] > 0) {
            isCollisionY = true;
            break;
        }
    }
    if (!isCollisionX) {
        //this.vel[0] *= -1;
        newXPos = this.pos[0] + this.vel[0];
        this.pos[0] = newXPos;
    }
    else {
        this.vel[0] *= -1;
    }

    if (!isCollisionY) {
        //this.vel[1] *= -1;
        newYPos = this.pos[1] + this.vel[1];
        this.pos[1] = newYPos;
    }
    else {
        this.vel[1] *= -1;
    }
}

module.exports = Orb;