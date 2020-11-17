const MovingObject = require("./moving_object");
const Util = require("./utils");

const DEFAULT = {
    COLOR: "gray",
    RADIUS: 16,
    POS: [16, 16],
    SPEED: 3
};

const isPressed = {
    up: false,
    down: false,
    left: false,
    right: false,
}

function Player() {
    let properties = {
        pos: DEFAULT.POS,
        vel: [0, 0],
        radius: DEFAULT.RADIUS,
        color: DEFAULT.COLOR
    }

    this.notes = [];
    this.colors = [];
    this.orgColor = DEFAULT.COLOR;
    this.orbSequence = [];
    this.sequenceCount = 0;
    this.audioCountdown = 0;
    this.visualCountdown = 0;
    this.isSafe = false;

    MovingObject.call(this, properties);
}

Util.inherits(Player, MovingObject);

Player.prototype.setPosition = function (pos) {
    this.pos = pos;
}

Player.prototype.getPosition = function () {
    return this.pos;
}

Player.prototype.move = function (gridCtx, gameCtx, safetyZoneCtx) {
    let newXPos = this.pos[0] + this.vel[0];
    let newYPos = this.pos[1] + this.vel[1];
    let imageDataX = gridCtx.getImageData(newXPos - DEFAULT.RADIUS, this.pos[1] - DEFAULT.RADIUS, 2*DEFAULT.RADIUS, 2*DEFAULT.RADIUS).data
    let imageDataY = gridCtx.getImageData(this.pos[0] - DEFAULT.RADIUS, newYPos - DEFAULT.RADIUS, 2*DEFAULT.RADIUS, 2*DEFAULT.RADIUS).data
    let safetyZoneImageData = safetyZoneCtx.getImageData(this.pos[0] - DEFAULT.RADIUS, this.pos[1] - DEFAULT.RADIUS, 2*DEFAULT.RADIUS, 2*DEFAULT.RADIUS).data
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
    let isCurrentlySafe = true
    for (let i = 3; i < safetyZoneImageData.length; i+=4) {
        if (safetyZoneImageData[i] === 0) {
            isCurrentlySafe = false;
            break;
        }
    }
    this.isSafe = isCurrentlySafe;
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

Player.prototype.playSequence = function (count) {
    if (this.sequenceCount < this.notes.length) {
        if (this.audioCountdown === 0) {
            this.color = this.orgColor;
            let note = this.notes.shift();
            this.synth.triggerAttackRelease(note, "16n");
            this.notes.push(note);
            let color = this.colors.shift();
            this.color = color;
            this.colors.push(color);
            switch (this.color) {
                case 'red':
                    this.imgFrame = 1;
                    break;
                case 'green':
                    this.imgFrame = 2;
                    break;
                case 'blue':
                    this.imgFrame = 3;
                    break;
                case 'purple':
                    this.imgFrame = 4;
                    break;
                case 'orange':
                    this.imgFrame = 5;
                    break;
                case 'yellow':
                    this.imgFrame = 6;
                    break;
                case 'pink':
                    this.imgFrame = 7;
                    break;
                default:
                    this.imgFrame = 0;
            }
            this.visualCountdown = 20;
            this.sequenceCount++
            this.audioCountdown = count
        }
        if (this.audioCountdown !== 0) {
            this.audioCountdown--;
        }
    }
    if (this.visualCountdown > 0) {
        this.visualCountdown--;
    }
    if (this.visualCountdown === 1) {
        this.color = this.orgColor;
        this.imgFrame = 0;
    }
}

Player.prototype.draw = function (ctx) {
    ctx.drawImage(this.sprite, this.sprite.height*this.imgFrame, 0, this.sprite.height, this.sprite.height, this.pos[0]-this.radius, this.pos[1]-this.radius, this.radius*2, this.radius*2);
};

module.exports = Player;