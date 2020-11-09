# Melody Collider
An online game based on collecting melodies. Implemented almost entirely in Vanilla Javascript, with visual rendering done in Canvas API, audio processing done in Tone.js, and key event handling done in keymaster.js.

[play Melody Collider](https://umnum.github.io/MelodyCollider)

## Gameplay

Colorful music orbs collide with each other inside of a grid. Each orb is associated with their own color and musical note. At the beginning of each level, these orbs play together in sequence, forming a melody. You will navigate this grid as a gray orb, collecting the melody in the sequence it was played. Avoid colliding with the wrong orbs, which will bring your melody out of sequence. Safety Zones are provided for you to shelter you from colliding with other orbs, as well as giving you the ability to trigger the melody sequence you have collected so far, followed by the remaining melody you must collect. Collecting the full melody advances you to the next level.

## Implementation

### Game Rendering

`GameView` renders all parts of the game. `setInterval` is called on `handleGame` to render the game at a refresh rate of 50fps. Conditianal statements determine which aspect of the game will be rendered.

```javascript
// game_view.js

if (this.game.isPlayingMenuScreen()) {
    this.game.playMenuScreen(this.menuCtx);
}
else {
    if (this.game.isGamePaused()) {
        this.game.playPauseScreen(this.pauseCtx);
    }
    else { // at this point, gameplay is rendered
        this.game.drawGrid(this.gridCtx, 'level ' + this.game.currentLevel, this.headerCtx, this.audioCtx);
        this.game.drawSafetyZone(this.safetyZoneCtx, this.instructionsCtx, 'level ' + this.game.currentLevel);
        if (!this.game.isWon) {
            this.game.drawHeader(this.headerCtx)
            this.game.drawAudioIcon(this.audioCtx);
        }
        if (this.game.isPlayingIntroSequence()) {
            this.game.playIntroSequence(this.gameCtx, 'level ' + this.game.currentLevel);
        }
        else { // can only play a melodic sequence inside of a Safety Zone
            if (this.game.isPlayingSequence()) {
                this.game.playSequence(this.gameCtx, null);
            }
            // render all the moving parts of the game
            this.game.moveObjects(this.gridCtx, this.gameCtx, this.safetyZoneCtx);
            this.game.draw(this.gameCtx);
        }
    }
}
```