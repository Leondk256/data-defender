// tslint:disable member-ordering
/// <reference path="GameScreen.ts" />

class TitleScreen extends GameScreen {
    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener, ship: Ship, playerProjectiles: Projectile) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
    }

    public draw() {
        // Set the Data Defender text
        this.writeTextToCanvas(
            "Data Defender",
            70,
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 15
        );

        this.writeMultipleTextLinesToCanvas(
            this.ctx,
            "Bedankt voor het spelen!\n We hopen dat je het een leuke game vond. :)",
            50,
            25,
            30
        );

    }
}