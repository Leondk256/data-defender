// tslint:disable member-ordering
/// <reference path="GameScreen.ts" />

class TitleScreen extends GameScreen {
    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener, ship: Ship, playerProjectiles: Projectile) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
        this.ship.setXPos(this.canvas.width / 2);
        this.ship.setYPos(this.canvas.height / 4);
    }

    public draw() {
        // Draw the ship
        this.ship.draw(this.ctx);

        // Set the Data Defender text
        this.writeTextToCanvas(
            "Data Defender",
            70,
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 15
        );

        this.writeMultipleTextLinesToCanvas(
            30,
            this.ctx,
            "Bedankt voor het spelen!\n We hopen dat je veel geleerd hebt en het een leuke game vond. :)",
            50,
            40,
            30
        );

        this.writeTextToCanvas(
            "Druk op esc als je opnieuw wilt beginnen",
            20,
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 80
        )
    }
}