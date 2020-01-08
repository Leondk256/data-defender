/// <reference path="GameScreen.ts" />
class GameOverScreen extends GameScreen{
    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener, ship: Ship, playerProjectiles: Projectile) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
    }

    public draw() {
        this.writeTextToCanvas(
            "GAME OVER",
            80,
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 15
        );

        this.writeTextToCanvas(
            "Druk op de esc knop om terug te gaan naar het hoofdmenu",
            24,
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 25
        );
    }
}