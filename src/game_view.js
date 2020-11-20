function GameView(game, gameCtx, gridCtx, safetyZoneCtx, instructionsCtx, menuCtx, headerCtx, pauseCtx, audioCtx) {
    this.game = game;
    this.gameCtx = gameCtx;
    this.gridCtx = gridCtx;
    this.safetyZoneCtx = safetyZoneCtx;
    this.instructionsCtx = instructionsCtx;
    this.menuCtx = menuCtx;
    this.headerCtx = headerCtx;
    this.pauseCtx = pauseCtx;
    this.audioCtx = audioCtx;
}

GameView.prototype.start = function () {
    window.setInterval(this.renderGame.bind(this), 20);
    this.bindKeyHandlers(this.game);
    this.game.menuStart();
};

GameView.prototype.renderGame = function (e) {
    if (this.game.isPlayingMenuScreen()) {
        this.game.playMenuScreen(this.menuCtx);
    }
    else {
        if (this.game.isGamePaused()) {
            this.game.playPauseScreen(this.pauseCtx);
        }
        else {
            this.game.drawGrid(this.gridCtx, 'level ' + this.game.currentLevel, this.headerCtx, this.audioCtx);
            this.game.drawSafetyZone(this.safetyZoneCtx, this.instructionsCtx, 'level ' + this.game.currentLevel);
            if (!this.game.isWon) {
                this.game.drawHeader(this.headerCtx)
                this.game.drawAudioIcon(this.audioCtx);
            }
            if (this.game.isPlayingIntroSequence()) {
                this.game.playIntroSequence(this.gameCtx, 'level ' + this.game.currentLevel);
            }
            else {
                if (this.game.isPlayingSequence()) {
                    this.game.playSequence(this.gameCtx, null);
                }
                this.game.moveObjects(this.gridCtx, this.gameCtx, this.safetyZoneCtx);
                this.game.draw(this.gameCtx);
            }
        }
    }
};

GameView.prototype.bindKeyHandlers = function (game) {
    let that = this;
    key('up', function () {game.player.direction('up')});
    key('down', function () {game.player.direction('down')});
    key('left', function () {game.player.direction('left')});
    key('right', function () {game.player.direction('right')});
    key('space', function () {if(game.player.isSafe) {game.isSequence = true}});
    key('up', function () {game.menuAction('up')});
    key('down', function () {game.menuAction('down')});
    key('left', function () {game.menuAction('left')});
    key('right', function () {game.menuAction('right')});
    key('enter', function () {game.menuAction('select', that.menuCtx)});
    key('left', function () {game.pauseAction('left')});
    key('right', function () {game.pauseAction('right')});
    key('enter', function () {game.pauseAction('select', that.pauseCtx, that.gameCtx, that.headerCtx, that.gridCtx, that.safetyZoneCtx, that.instructionsCtx, that.audioCtx)});
    key('m', function () {game.toggleAudio()});
}

module.exports = GameView;