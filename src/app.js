const MovingObject = require("./moving_object.js");

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext('2d');

    const object = new MovingObject({
        pos: [200, 200], // center position
        vel: [10, 10], // [x,y] vector velocity
        radius: 10,
        color: "gray"
    });

    object.draw(ctx);
});