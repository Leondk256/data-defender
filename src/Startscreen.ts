// tslint:disable member-ordering
/// <reference path="GameScreen.ts" />

class StartScreen extends GameScreen {

    // private readonly canvas: HTMLCanvasElement;
    // private readonly ctx: CanvasRenderingContext2D;

    private : HTMLImageElement;
    private button: HTMLImageElement;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);
        // this.canvas = canvas;
        // this.ctx = ctx;

    //     this.button = new Image();
    //     this.button.src = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";
    }

    public draw() {
        // 1. add 'Asteroids' text
        this.writeTextToCanvas("Data Defender", 70, this.canvas.width / 2, 150);

        // 2. add 'Press to play' text
        this.writeTextToCanvas(
            "Start",
            40,
            this.canvas.width / 2,
            (this.canvas.height / 100) * 90
        );


        // 3. add Namebox
        this.writeTextToCanvas(
            "Enter your name:",
            30,
            this.canvas.width / 3,
            (this.canvas.height / 100) * 30 
        );

        // add Ship Selector
        this.writeTextToCanvas(
            "Use the arrows to select your ship:",
            30,
            this.canvas.width / 2,
            this.canvas.height / 2
        );


        // 5. add play button
        // const buttonX = this.canvas.width / 2;
        // const buttonY = this.canvas.height / 2 + 219; // 219 is a nice spot for the button

        // if (this.button.naturalWidth > 0) {
        //     this.ctx.drawImage(this.button, buttonX - this.button.width / 2, buttonY);
        //     this.writeTextToCanvas("Press s to play", 20, buttonX, buttonY + 26, "center", "black");
        // }
    }
}
