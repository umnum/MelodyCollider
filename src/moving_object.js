const Tone = require("tone");

function MovingObject(object) {
    this.pos = object.pos;
    this.vel = object.vel;
    this.radius = object.radius;
    this.color = object.color;
    this.sprite = null;
    this.imgFrame = 0;
    this.loadImage();
    this.isFlashing = false;
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

        this.sprite.src = './images/sprites/' + this.color + '_orb.png';
    }
}

MovingObject.prototype.draw = function (ctx) {
    if (this.isFlashing && this.imgFrame < 16) {
        ctx.drawImage(this.sprite, this.sprite.height*this.imgFrame, 0, this.sprite.height, this.sprite.height, this.pos[0]-this.radius, this.pos[1]-this.radius, this.radius*2, this.radius*2);
        this.imgFrame++;
    }
    else {
        ctx.drawImage(this.sprite, 0, 0, this.sprite.height, this.sprite.height, this.pos[0]-this.radius, this.pos[1]-this.radius, this.radius*2, this.radius*2);
    }
};

module.exports = MovingObject;