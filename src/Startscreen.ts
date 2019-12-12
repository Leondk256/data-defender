// tslint:disable member-ordering
/// <reference path="GameScreen.ts" />

class StartScreen extends GameScreen {

    // private readonly canvas: HTMLCanvasElement;
    // private readonly ctx: CanvasRenderingContext2D;

    private: HTMLImageElement;
    private buttonRight: HTMLImageElement;
    private buttonLeft: HTMLImageElement;

    private buttonRightX: number;
    private buttonRightY: number;
    private buttonLeftX: number;
    private buttonLeftY: number;

    private shipSelector: number;
    private ships: Ship[];
    private keyboardListener: KeyboardListener;
    private levelScreen = LevelScreen;

    //count all gamecycles
    private gamecounter: number;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, shipSelector: number) {
        super(canvas, ctx);
        // this.canvas = canvas;
        // this.ctx = ctx;

        //Create both buttons
        this.buttonRight = new Image();
        this.buttonRight.src = "./assets/img/buttons/arrowRight.png";

        this.buttonLeft = new Image();
        this.buttonLeft.src = "./assets/img/buttons/arrowLeft.png";

        //Positions for both buttons
        this.buttonRightX = (this.canvas.width / 100) * 70;
        this.buttonRightY = (this.canvas.height / 100) * 55;

        this.buttonLeftX = (this.canvas.width / 100) * 35;
        this.buttonLeftY = (this.canvas.height / 100) * 55;

        //Ship selection default index
        this.shipSelector = shipSelector;

        //Add mouselistener
        document.addEventListener("click", this.mouseHandler);

        //add the selectable ships to the ship array
        this.ships = [];
        for (let i = 0; i <= 2; i++) {

            this.ships.push( 
                new Ship(
                `./assets/img/ship${i}.png`,
                this.canvas.width / 2,
                (this.canvas.height / 100) * 65,
                5,
                5,
                this.keyboardListener,
                5
                )
            )
        };


    }

    public draw() {
        // 1. add 'Asteroids' text
        this.writeTextToCanvas("Data Defender", 70, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 15);

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

        // 4. Ship Selector functionality

        // Select your ship text
        this.writeTextToCanvas(
            "Use the arrows to select your ship:",
            30,
            this.canvas.width / 2,
            (this.canvas.height / 100) * 45
        );


        // Add ship selector buttons
        if (this.buttonRight.naturalWidth > 0 && this.buttonLeft.naturalWidth > 0) {
            this.ctx.drawImage(this.buttonRight, this.buttonRightX - this.buttonRight.width / 2, this.buttonRightY);
            this.ctx.drawImage(this.buttonLeft, this.buttonLeftX - this.buttonLeft.width / 2, this.buttonLeftY);
        }

        // Draw selected ship
        this.ships[this.shipSelector].draw(this.ctx)
    }

    /**
* Method to handle the mouse event
* @param {MouseEvent} event - mouse event
*/
    private mouseHandler = (event: MouseEvent) => {
        // console.log(`xPos: ${event.clientX}, yPos: ${event.clientY}`);

        //click detection for the buttons
        if (
            event.clientX >= this.buttonRightX &&
            event.clientX < this.buttonRightX + this.buttonRight.width &&
            event.clientY >= this.buttonRightY &&
            event.clientY <= this.buttonRightY + this.buttonRight.width
        ) {
            //Change ship when the button is clicked
            if (this.shipSelector === 2) {
                this.shipSelector = 0;
            } else {
            this.shipSelector += 1;
            }
        }
        if (
            event.clientX >= this.buttonLeftX &&
            event.clientX < this.buttonLeftX + this.buttonLeft.width &&
            event.clientY >= this.buttonLeftY &&
            event.clientY <= this.buttonLeftY + this.buttonLeft.width
        ) {
            //Change ship when the button is clicked
            if (this.shipSelector === 0) {
                this.shipSelector = 2;
            } else {
            this.shipSelector -= 1;
            }
        }
    };

    public getShipSelector(): number {
        return this.shipSelector;
    }
}
