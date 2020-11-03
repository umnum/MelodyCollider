/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Orb = __webpack_require__(/*! ./orb */ "./src/orb.js");

const DIM_X = 700;
const DIM_Y = 500;
const NUM_ORBS = 3;

function Game() {
    // call addOrbs()
    this.orbs = this.addOrbs();
}

Game.prototype.addOrbs = function () {
    // NUM_ORBS times: new orb
    let orbs = [];
    for (let i = 0; i < NUM_ORBS; i++) {
        orbs.push(new Orb(this.randomPosition()));
    }
    return orbs;
};

Game.prototype.randomPosition = function () {
    let randPosX = Math.floor(Math.random() * DIM_X);
    let randPosY = Math.floor(Math.random() * DIM_Y);
    return [randPosX, randPosY];
}

Game.prototype.draw = function (ctx) {
    // clearRect(ctx)
    // NUM_ORBS times: orb[i].draw(ctx)
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.orbs.forEach(function (orb) {
        orb.draw(ctx);
    });
}

Game.prototype.moveObjects = function () {
    // NUM_ORBS times: orb[i].move(ctx)
    this.orbs.forEach(function (orb) {
        orb.move();
    })
};

module.exports = Game;

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

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

/***/ }),

/***/ "./src/orb.js":
/*!********************!*\
  !*** ./src/orb.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 28:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");
const Util = __webpack_require__(/*! ./utils */ "./src/utils.js");

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

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

const Util = {
    inherits(childClass, parentClass) {
        function Surrogate() {};
        Surrogate.prototype = parentClass.prototype;
        childClass.prototype = new Surrogate();
        childClass.prototype.constructor = childClass;
    },
    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return (Util.scale([Math.sin(deg), Math.cos(deg)], length));
    },
    scale(vec, mag) {
        return [Math.round(vec[0] * mag), Math.round(vec[1] * mag)];
    }
};

module.exports = Util;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
const Game = __webpack_require__(/*! ./game */ "./src/game.js");

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext('2d');

    // draw Orbs in Game
    const game = new Game();
    game.draw(ctx);
    game.moveObjects();
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map