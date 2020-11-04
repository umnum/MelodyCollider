const MovingObject = require("./moving_object");
const Util = require("./utils");

const DEFAULT = {
    COLOR: "gray",
    RADIUS: 15,
    SPEED: 3
};

const isPressed = {
    up: false,
    down: false,
    left: false,
    right: false,
}

function Player(pos) {
    let properties = {
        pos: pos,
        vel: [0, 0],
        radius: DEFAULT.RADIUS,
        color: DEFAULT.COLOR
    }
    MovingObject.call(this, properties);
}

Util.inherits(Player, MovingObject);

Player.prototype.move = function (gridCtx, gameCtx) {
    let newXPos = this.pos[0] + this.vel[0];
    let newYPos = this.pos[1] + this.vel[1];
    let imageDataX = gridCtx.getImageData(newXPos - DEFAULT.RADIUS, this.pos[1] - DEFAULT.RADIUS, 2*DEFAULT.RADIUS, 2*DEFAULT.RADIUS).data
    let imageDataY = gridCtx.getImageData(this.pos[0] - DEFAULT.RADIUS, newYPos - DEFAULT.RADIUS, 2*DEFAULT.RADIUS, 2*DEFAULT.RADIUS).data
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
        this.pos[0] = newXPos;
    }
    if (!isCollisionY) {
        this.pos[1] = newYPos;
    }
}

Player.prototype.direction = function (key) {
    switch (key) {
        case 'up':
            isPressed.up = true;
            this.vel[1] = -DEFAULT.SPEED;
            break;
        case 'down':
            isPressed.down = true;
            this.vel[1] = DEFAULT.SPEED;
            break;
        case 'left':
            isPressed.left = true;
            this.vel[0] = -DEFAULT.SPEED;
            break;
        case 'right':
            isPressed.right = true;
            this.vel[0] = DEFAULT.SPEED;
            break;
        case 'ArrowLeft':
            isPressed.left = false;
            this.vel[0] = isPressed.right ? DEFAULT.SPEED : 0;
            break;
        case 'ArrowRight':
            isPressed.right = false;
            this.vel[0] = isPressed.left ? -DEFAULT.SPEED : 0;
            break;
        case 'ArrowUp':
            isPressed.up = false;
            this.vel[1] = isPressed.down ? DEFAULT.SPEED : 0;
            break;
        case 'ArrowDown':
            isPressed.down = false;
            this.vel[1] = isPressed.up ? -DEFAULT.SPEED : 0;
            break;
    }
}

module.exports = Player;