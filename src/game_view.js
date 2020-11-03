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