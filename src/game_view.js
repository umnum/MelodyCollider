function GameView(game, ctx) {
    this.game = game;
    this.ctx = ctx;
}

GameView.prototype.start = function () {
    window.setInterval(this.handleGame.bind(this), 2000);
};

GameView.prototype.handleGame = function (e) {
    this.game.moveObjects();
    this.game.draw(this.ctx);
};

module.exports = GameView;