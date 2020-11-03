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

module.exports = Orb;