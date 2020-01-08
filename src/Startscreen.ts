// tslint:disable member-ordering
/// <reference path="GameScreen.ts" />

class StartScreen extends GameScreen {

    private buttonRight: HTMLImageElement;
    private buttonLeft: HTMLImageElement;
    private nameInputField: HTMLImageElement;
    private startButton: HTMLImageElement;

    private playerName: string;

    private buttonRightX: number;
    private buttonRightY: number;
    private buttonLeftX: number;
    private buttonLeftY: number;
    private nameInputFieldX: number;
    private nameInputFieldY: number;
    private startButtonX: number;
    private startButtonY: number;

    private startScreenObjects: GameObject[];

    private shipSelector: number;
    private ships: Ship[];
    //count all gamecycles
    private gamecounter: number;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener, ship: Ship, playerProjectiles: Projectile) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);

        // Create startScreenObjects array
        this.startScreenObjects = [];

        this.ships = [];
        // Create all buttons
        this.buttonRight = new Image();
        this.buttonRight.src = "./assets/img/buttons/arrowRight.png";

        this.buttonLeft = new Image();
        this.buttonLeft.src = "./assets/img/buttons/arrowLeft.png";

        Game.gameStarted = false;

        // Reset playerlives when start screen is initiated
        Game.playerLives = 3;

        this.startButton = new Image();
        this.startButton.src = "./assets/img/buttons/startbutton.png"

        //Create NameField
        this.nameInputField = new Image();
        this.nameInputField.src = "./assets/img/buttons/nameinputfield.jpg";

        //Positions for both buttons
        this.buttonRightX = (this.canvas.width / 100) * 55;
        this.buttonRightY = (this.canvas.height / 100) * 55;

        this.buttonLeftX = (this.canvas.width / 100) * 32;
        this.buttonLeftY = (this.canvas.height / 100) * 55;

        // Postion for startbutton
        this.startButtonX = (this.canvas.width / 100) * 40;
        this.startButtonY = (this.canvas.height / 100) * 82;

        //Poition for name inputfield
        this.nameInputFieldX = (this.canvas.width / 100) * 50;
        this.nameInputFieldY = (this.canvas.height / 100) * 20;

        //Ship selection default index
        this.shipSelector = 0;
        Game.selectedShip = this.shipSelector;

        // Set initial blackholescreen counter
        Game.blackholeScreenCounter = -1;

        // Set default friendly projectile
        Game.currentFriendlyProjectile = 0; 

        //Add mouselistener
        document.addEventListener("click", this.mouseHandler);

        // Add facebookplanet background image
        this.createGameObject("./assets/img/environment/facebookplaneet1.png", 10, 40, this.startScreenObjects)

        // Add TikTokplanet background image
        this.createGameObject("./assets/img/environment/tiktokplaneet.png", 75, 12, this.startScreenObjects)

        // Add Youtubeplaneet
        this.createGameObject("./assets/img/environment/youtubeplaneet.png", 25, 85, this.startScreenObjects)

        // Add thumbsup
        this.createGameObject("./assets/img/environment/thumbsupfb.png", 90, 85, this.startScreenObjects)

        // Add heart
        this.createGameObject("./assets/img/environment/heart.png", 5, 10, this.startScreenObjects)

        // Add instaDM
        this.createGameObject("./assets/img/environment/instadm.png", 90, 40, this.startScreenObjects)

        // Add the selectable ships to the ship array
        this.ships = [];
        for (let i = 0; i <= 3; i++) {
            this.ships.push(
                new Ship(
                    Game.currentId,
                    `./assets/img/ship${i}.png`,
                    this.canvas.width / 2,
                    (this.canvas.height / 100) * 66,
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

        // 3. add Namebox
        // Add the name input field
        this.writeTextToCanvas(
            "Vul je naam in:",
            30,
            (this.canvas.width / 2) - 155,
            (this.canvas.height / 100) * 25
        );

        // Select your ship text
        this.writeTextToCanvas(
            "Klik op de de pijltjes om je schip te selecteren:",
            30,
            this.canvas.width / 2,
            (this.canvas.height / 100) * 45
        );

        // Tutorial: Write goal to canvas of the Startscreen
        this.writeMultipleTextLinesToCanvas(
            this.ctx,
            'Doel: \n\nVersla de sociale media!\n\n',
            20,
            60,
            17
        );

        //Tutorial: Write controls to the canvas of the Startcreen
        this.writeMultipleTextLinesToCanvas(
            this.ctx,
            'Besturing:\n\nGebruik de pijltjestoetsen om\n projectielen te ontwijken!\n\nGebruik spatiebalk om te schieten!',
            80,
            60,
            17
        );

        // Add ship selector buttons
        if (this.buttonRight.naturalWidth > 0 && this.buttonLeft.naturalWidth > 0) {
            this.ctx.drawImage(this.buttonRight, this.buttonRightX, this.buttonRightY);
            this.ctx.drawImage(this.buttonLeft, this.buttonLeftX, this.buttonLeftY);
            this.ctx.drawImage(this.nameInputField, this.nameInputFieldX, this.nameInputFieldY)
            this.ctx.drawImage(this.startButton, this.startButtonX, this.startButtonY)
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

        // Draw stars
        this.drawStars();

        // Draw background design
        this.drawAllObjects(this.startScreenObjects)
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
            if (this.shipSelector === 3) {
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
                this.shipSelector = 3;
            } else {
                this.shipSelector -= 1;
            }
            Game.selectedShip = this.shipSelector;
        }

        if (
            event.clientX >= this.startButtonX &&
            event.clientX < this.startButtonX + this.startButton.width &&
            event.clientY >= this.startButtonY &&
            event.clientY <= this.startButtonY + this.startButton.width
        ) {
            Game.gameStarted = true;
        }
    };
}
