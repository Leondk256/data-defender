/// <reference path="GameScreen.ts" />
class GameOverScreen extends GameScreen{

    private keyboardListener: KeyboardListener;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener) {
        super(canvas, ctx);
    }

    public draw() {
        this.writeTextToCanvas(
            "GAME OVER",
            80,
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 15
        );
    }
}