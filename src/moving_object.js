const Tone = require("tone");

function MovingObject(object) {
    this.pos = object.pos;
    this.vel = object.vel;
    this.radius = object.radius;
    this.color = object.color;
    this.sprite = null;
    this.loadImage();
    this.synth = new Tone.AMSynth({
        harmonicity: 3/1,
        detune: 0,
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.01,
            decay: 0.1,
            sustain: 0.5,
            release: 0.7,
        },
        modulation: {
            type: "sine"
        },
        modulationEnvelope: {
            attack: 0.05,
            decay: 0.1,
            sustain: 1,
            release: 0.5
        }
    }).toDestination();

};

MovingObject.prototype.loadImage = function () {
    if (!this.sprite) {
        this.sprite = new Image();

        this.sprite.src = './images/sprites/ball.gif';
        this.sprite.crossOrigin = "Anonymous";
    }
}

MovingObject.prototype.draw = function (ctx) {
    // draw a circle
    //ctx.beginPath();
    //ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    //ctx.closePath();
    //// circle has no border
    //ctx.strokeStyle = 'transparent';
    //// fill circle with MovingObject color property
    //ctx.fillStyle = this.color;
    //ctx.fill();
    //ctx.stroke();
    ctx.drawImage(this.sprite, 50, 50, 50, 50);
};

module.exports = MovingObject;