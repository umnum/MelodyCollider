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

Orb.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0],
                this.pos[1] + this.vel[1]];
}

module.exports = Orb;