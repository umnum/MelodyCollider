function GameView(game, gameCtx, gridCtx, menuCtx, headerCtx) {
    this.game = game;
    this.gameCtx = gameCtx;
    this.gridCtx = gridCtx;
    this.menuCtx = menuCtx;
    this.headerCtx = headerCtx;
}

GameView.prototype.start = function () {
    window.setInterval(this.handleGame.bind(this), 20);
    this.bindKeyHandlers(this.game);
    this.game.menuStart();
};

GameView.prototype.handleGame = function (e) {
    if (this.game.isPlayingMenuScreen()) {
        this.game.playMenuScreen(this.menuCtx);
    }
    else {
        this.game.drawGrid(this.gridCtx, 'level ' + this.game.currentLevel);
        this.game.drawHeader(this.headerCtx);
        if (this.game.isPlayingIntroSequence()) {
            this.game.playIntroSequence(this.gameCtx, 'level ' + this.game.currentLevel);
        }
        else {
            this.game.moveObjects(this.gridCtx, this.gameCtx);
            this.game.draw(this.gameCtx);
        }
    }
};

GameView.prototype.bindKeyHandlers = function (game) {
    let that = this;
    key('up', function () {game.player.direction('up')});
    key('down', function () {game.player.direction('down')});
    key('left', function () {game.player.direction('left')});
    key('right', function () {game.player.direction('right')});
    key('up', function () {game.menuAction('up')});
    key('down', function () {game.menuAction('down')});
    key('enter', function () {game.menuAction('select', that.menuCtx)});
    //key('space', function () {alert('you pressed space!')});
}

module.exports = GameView;