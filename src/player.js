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

Player.prototype.move = function (gridCtx) {
    let newXPos = this.pos[0] + this.vel[0];
    let newYPos = this.pos[1] + this.vel[1];
    let imageData = gridCtx.getImageData(newXPos - DEFAULT.RADIUS, newYPos - DEFAULT.RADIUS, 2*DEFAULT.RADIUS, 2*DEFAULT.RADIUS).data
    let isCollision = false; // check grid's Alpha channel for collision with Player
    for (let i = 0; i < imageData.length; i+=3) {
        if (imageData[i] > 0) {
            isCollision = true;
            break;
        }
    }
    this.pos = isCollision ? this.pos : [newXPos, newYPos];
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