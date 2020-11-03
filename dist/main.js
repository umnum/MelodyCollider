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
const Player = __webpack_require__(/*! ./player */ "./src/player.js");

const DIM_X = 700;
const DIM_Y = 500;
const NUM_ORBS = 3;

function Game() {
    // call addOrbs()
    this.orbs = this.addOrbs();
    this.player = new Player(this.randomPosition());
}

Game.prototype.addOrbs = function () {
    // NUM_ORBS times: new orb
    let orbs = [];
    for (let i = 0; i < NUM_ORBS; i++) {
        orbs.push(new Orb(this.randomPosition()));
    }
    return orbs;
};

Game.prototype.allObjects = function () {
    return [this.player].concat(this.orbs);
}

Game.prototype.randomPosition = function () {
    let randPosX = Math.floor(Math.random() * DIM_X);
    let randPosY = Math.floor(Math.random() * DIM_Y);
    return [randPosX, randPosY];
}

Game.prototype.draw = function (ctx) {
    // clearRect(ctx)
    // NUM_ORBS times: orb[i].draw(ctx)
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.allObjects().forEach(function (object) {
        object.draw(ctx);
    });
}

Game.prototype.moveObjects = function () {
    // NUM_ORBS times: orb[i].move(ctx)
    this.allObjects().forEach(function (object) {
        object.move();
    })
};

module.exports = Game;

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function GameView(game, ctx) {
    this.game = game;
    this.ctx = ctx;
}

GameView.prototype.start = function () {
    window.setInterval(this.handleGame.bind(this), 20);
    this.bindKeyHandlers(this.game);
};

GameView.prototype.handleGame = function (e) {
    this.game.moveObjects();
    this.game.draw(this.ctx);
};

GameView.prototype.bindKeyHandlers = function (game) {
    key('up', function () {game.player.direction('up')});
    key('down', function () {game.player.direction('down')});
    key('left', function () {game.player.direction('left')});
    key('right', function () {game.player.direction('right')});
    //key('enter', function () {alert('you pressed enter!')});
    //key('space', function () {alert('you pressed space!')});
}

module.exports = GameView;

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

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 44:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");
const Util = __webpack_require__(/*! ./utils */ "./src/utils.js");

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
            this.vel = [0,-DEFAULT.SPEED];
            break;
        case 'down':
            this.vel = [0,DEFAULT.SPEED];
            break;
        case 'left':
            this.vel = [-DEFAULT.SPEED,0];
            break;
        case 'right':
            this.vel = [DEFAULT.SPEED,0];
            break;
    }
}

module.exports = Player;

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
const GameView = __webpack_require__(/*! ./game_view */ "./src/game_view.js");

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext('2d');

    const game = new Game();

    // continuously draw moving Orbs in Game
    const gameView = new GameView(game, ctx);
    gameView.start();
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map