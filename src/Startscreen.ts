// tslint:disable member-ordering
/// <reference path="GameScreen.ts" />

class StartScreen extends GameScreen {

    private buttonRight: HTMLImageElement;
    private buttonLeft: HTMLImageElement;
    private nameInputField: HTMLImageElement;

    private playerName: string;

    private buttonRightX: number;
    private buttonRightY: number;
    private buttonLeftX: number;
    private buttonLeftY: number;
    private nameInputFieldX: number;
    private nameInputFieldY: number;

    private shipSelector: number;
    private ships: Ship[];
    private keyboardListener: KeyboardListener;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, shipSelector: number) {
        super(canvas, ctx);
        // this.canvas = canvas;
        // this.ctx = ctx;

        //Create both buttons
        this.buttonRight = new Image();
        this.buttonRight.src = "./assets/img/buttons/arrowRight.png";

        this.buttonLeft = new Image();
        this.buttonLeft.src = "./assets/img/buttons/arrowLeft.png";

        //Create NameField
        this.nameInputField = new Image();
        this.nameInputField.src = "./assets/img/buttons/nameinputfield.jpg";

        //Positions for both buttons
        this.buttonRightX = (this.canvas.width / 100) * 55;
        this.buttonRightY = (this.canvas.height / 100) * 55;

        this.buttonLeftX = (this.canvas.width / 100) * 34.5;
        this.buttonLeftY = (this.canvas.height / 100) * 55;

        //Poition for name inputfield
        this.nameInputFieldX = (this.canvas.width / 100) * 50;
        this.nameInputFieldY = (this.canvas.height / 100) * 20;

        //Ship selection default index
        this.shipSelector = shipSelector;
        Game.selectedShip = this.shipSelector;

        //Add mouselistener
        document.addEventListener("click", this.mouseHandler);

        //add the selectable ships to the ship array
        this.ships = [];
        for (let i = 0; i <= 2; i++) {

            this.ships.push(
                new Ship(
                    Game.currentId,
                    `./assets/img/ship${i}.png`,
                    this.canvas.width / 2,
                    (this.canvas.height / 100) * 65,
                    5,
                    5,
                    this.keyboardListener,
                    5
                )
            )
        }
    }

    public draw() {
        // Set the Data Defender text
        this.writeTextToCanvas(
            "Data Defender",
            70,
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 15);

        // Write the press s to start
        this.writeTextToCanvas(
            "Druk op s om te beginnen",
            40,
            this.canvas.width / 2,
            (this.canvas.height / 100) * 90
        );

        // Add the name input field
        this.writeTextToCanvas(
            "Vul je naam in:",
            30,
            (this.canvas.width / 2) -155,
            (this.canvas.height / 100) * 25
        );

        // Select your ship text
        this.writeTextToCanvas(
            "Klik op de de pijltjes om je schip te selecteren:",
            30,
            this.canvas.width / 2,
            (this.canvas.height / 100) * 45
        );

        // Add ship selector buttons
        if (this.buttonRight.naturalWidth > 0 && this.buttonLeft.naturalWidth > 0) {
            this.ctx.drawImage(this.buttonRight, this.buttonRightX, this.buttonRightY);
            this.ctx.drawImage(this.buttonLeft, this.buttonLeftX, this.buttonLeftY);
            this.ctx.drawImage(this.nameInputField, this.nameInputFieldX, this.nameInputFieldY)
        }

        // Enter player name after filling out has been completed
        if (Game.globalPlayerName !== undefined) {
            this.writeTextToCanvas(
                Game.globalPlayerName,
                30,
                this.nameInputFieldX + this.nameInputField.width / 2,
                this.nameInputFieldY + this.nameInputField.height / 2,
                "center",
                "black"
            );
        }

        // Draw selected ship
        this.ships[this.shipSelector].draw(this.ctx)
    }

    /**
     * Method to handle the mouse event
     * @param {MouseEvent} event - mouse event
     */
    private mouseHandler = (event: MouseEvent) => {

        // Click detection for the name input box
        if (
            event.clientX >= this.nameInputFieldX &&
            event.clientX < this.nameInputFieldX + this.nameInputField.width &&
            event.clientY >= this.nameInputFieldY &&
            event.clientY <= this.nameInputFieldY + this.nameInputField.width
        ) {
            // Only prompt the name box when there isn't any name
            if (this.playerName === undefined && Game.globalPlayerName === undefined) {
                this.playerName = prompt('Wat is je naam?');
                Game.globalPlayerName = this.playerName;
            }
        }

        // Click detection for the buttons
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

            Game.selectedShip = this.shipSelector;
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
            Game.selectedShip = this.shipSelector;
        }
    };

    public getShipSelector(): number {
        return this.shipSelector;
    }
}
