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
}

module.exports = Player;