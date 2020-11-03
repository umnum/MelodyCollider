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
    key('keyup', function () {game.player.direction('keyup')});
    //key('enter', function () {alert('you pressed enter!')});
    //key('space', function () {alert('you pressed space!')});
}

module.exports = GameView;