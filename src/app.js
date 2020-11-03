const MovingObject = require("./moving_object");
const Orb = require("./orb");

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext('2d');

    // draw a MovingObject
    const object = new MovingObject({
        pos: [200, 200], // center position
        vel: [10, 10], // [x,y] vector velocity
        radius: 10,
        color: "gray"
    });
    object.draw(ctx);

    // draw an Orb
    const orb = new Orb([300, 300])
    orb.draw(ctx);
});