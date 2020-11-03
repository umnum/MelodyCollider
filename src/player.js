const MovingObject = require("./moving_object");
const Util = require("./utils");

const DEFAULT = {
    COLOR: "gray",
    RADIUS: 15,
    SPEED: 3
};

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

Player.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0],
                this.pos[1] + this.vel[1]];
}

Player.prototype.direction = function (key) {
    switch (key) {
        case 'up':
            this.vel[1] = -DEFAULT.SPEED;
            break;
        case 'down':
            this.vel[1] = DEFAULT.SPEED;
            break;
        case 'left':
            this.vel[0] = -DEFAULT.SPEED;
            break;
        case 'right':
            this.vel[0] = DEFAULT.SPEED;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            this.vel[0] = 0;
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            this.vel[1] = 0;
            break;
    }
}

module.exports = Player;