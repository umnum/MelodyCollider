function MovingObject(object) {
    this.pos = object.pos;
    this.vel = object.vel;
    this.radius = object.radius;
    this.color = object.color;
};

MovingObject.prototype.draw = function (ctx) {
    // draw a circle
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.closePath();
    // circle has no border
    ctx.strokeStyle = 'transparent';
    // fill circle with MovingObject color property
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
};

module.exports = MovingObject;