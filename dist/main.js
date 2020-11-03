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

Game.prototype.movePlayer = function (gridCtx) {
    // Player's center pixel position has collided with the grid walls
    this.player.move(gridCtx);
}

module.exports = Game;

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function GameView(game, gameCtx, gridCtx) {
    this.game = game;
    this.gameCtx = gameCtx;
    this.gridCtx = gridCtx;
}

GameView.prototype.start = function () {
    window.setInterval(this.handleGame.bind(this), 20);
    this.bindKeyHandlers(this.game);
    this.drawGrid();
};

GameView.prototype.handleGame = function (e) {
    // get Player's center pixel position within grid canvas bitmap
    let imageData = this.gridCtx.getImageData(this.game.player.pos[0], this.game.player.pos[1], 1, 1);
    this.game.movePlayer(this.gridCtx);
    //this.game.moveObjects();
    this.game.draw(this.gameCtx);
};

GameView.prototype.drawGrid = function () {
    this.gridCtx.beginPath();
    this.gridCtx.strokeStyle = "black";
    this.gridCtx.fill();
    this.gridCtx.rect(10, 10, 680, 480)
    this.gridCtx.lineWidth = 20;
    this.gridCtx.stroke();
}

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
/*! CommonJS bailout: module.exports is used directly at 94:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");
const Util = __webpack_require__(/*! ./utils */ "./src/utils.js");

const DEFAULT = {
    COLOR: "gray",
    RADIUS: 15,
    SPEED: 3
};

const isPressed = {
    up: false,
    down: false,
    left: false,
    right: false,
}

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

Player.prototype.move = function (gridCtx) {
    let newXPos = this.pos[0] + this.vel[0];
    let newYPos = this.pos[1] + this.vel[1];
    let imageDataX = gridCtx.getImageData(newXPos - DEFAULT.RADIUS, this.pos[1] - DEFAULT.RADIUS, 2*DEFAULT.RADIUS, 2*DEFAULT.RADIUS).data
    let imageDataY = gridCtx.getImageData(this.pos[0] - DEFAULT.RADIUS, newYPos - DEFAULT.RADIUS, 2*DEFAULT.RADIUS, 2*DEFAULT.RADIUS).data
    // check x-y collisions seperately, to allow smooth sliding along grid walls
    let isCollisionX = false; // check grid's Alpha channel for collision with Player along x-axis
    let isCollisionY = false; // check grid's Alpha channel for collision with Player along y-axis
    for (let i = 0; i < imageDataX.length; i+=3) {
        if (imageDataX[i] > 0) {
            isCollisionX = true;
            break;
        }
    }
    for (let i = 0; i < imageDataY.length; i+=3) {
        if (imageDataY[i] > 0) {
            isCollisionY = true;
            break;
        }
    }
    if (!isCollisionX) {
        this.pos[0] = newXPos;
    }
    if (!isCollisionY) {
        this.pos[1] = newYPos;
    }
}

Player.prototype.direction = function (key) {
    switch (key) {
        case 'up':
            isPressed.up = true;
            this.vel[1] = -DEFAULT.SPEED;
            break;
        case 'down':
            isPressed.down = true;
            this.vel[1] = DEFAULT.SPEED;
            break;
        case 'left':
            isPressed.left = true;
            this.vel[0] = -DEFAULT.SPEED;
            break;
        case 'right':
            isPressed.right = true;
            this.vel[0] = DEFAULT.SPEED;
            break;
        case 'ArrowLeft':
            isPressed.left = false;
            this.vel[0] = isPressed.right ? DEFAULT.SPEED : 0;
            break;
        case 'ArrowRight':
            isPressed.right = false;
            this.vel[0] = isPressed.left ? -DEFAULT.SPEED : 0;
            break;
        case 'ArrowUp':
            isPressed.up = false;
            this.vel[1] = isPressed.down ? DEFAULT.SPEED : 0;
            break;
        case 'ArrowDown':
            isPressed.down = false;
            this.vel[1] = isPressed.up ? -DEFAULT.SPEED : 0;
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

const game = new Game();

document.addEventListener("DOMContentLoaded", function () {
    const gameCanvas = document.getElementById("game-canvas");
    const gridCanvas = document.getElementById("grid-canvas");
    const gameCtx = gameCanvas.getContext('2d');
    const gridCtx = gridCanvas.getContext('2d');

    // continuously draw moving Orbs in Game
    const gameView = new GameView(game, gameCtx, gridCtx);
    gameView.start();
});

document.addEventListener('keyup', function (event) {game.player.direction(event.key)});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map