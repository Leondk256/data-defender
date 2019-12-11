// tslint:disable member-ordering
///<reference path="Gamescreen.ts"/>

class LevelScreen extends GameScreen {

    private keyboardListener: KeyboardListener;

    private lives: number;
    private score: number;
    private life: HTMLImageElement;
    private ship: Ship;

    private facebookBoss: FacebookBoss;
    // private ship: Ship;
    // private keyboardListener: KeyboardListener;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener) {
        super(canvas,ctx);
        this.lives = 3;
        this.score = 400;
        this.keyboardListener = keyboardListener;

        // this.life = new Image();
        // this.life.src = "./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png";

        this.facebookBoss = new FacebookBoss(
            "./assets/images/enemy.png",
            this.canvas.width - 300,
            this.canvas.height - 800,
            0,
            10
        );

        // Create a ship
        this.ship = new Ship(
            "./assets/images/ship.png",
            this.canvas.width / 2,
            this.canvas.height / 2,
            5,
            5,
            this.keyboardListener,
        );
    }

    public draw() {
        // 1. load life images
        // this.writeLifeImagesToLevelScreen();

        // 2. draw current score
        // this.writeTextToCanvas(
        //     `Your score: ${this.score}`,
        //     20,
        //     this.canvas.width - 100,
        //     30,
        //     "right",
        // );

        // Move and draw all the game entities
            // if (this.ship.isColliding(asteroid)) {
            //     this.lives--;
            // }
            this.facebookBoss.draw(this.ctx);
            this.facebookBoss.move(this.canvas);

        // Move the Ship
        this.ship.move(this.canvas);

        // Draw the Ship
        this.ship.draw(this.ctx);

        // Shoot with the Ship
        this.ship.shoot(this.ctx);
        // });
    }

    // /**
    //  * Uses the loaded life image to remaining lives of the player on the rop
    //  * left of the screen.
    //  *
    //  * @param {HTMLImageElement} img the loaded image object
    //  */
    // private writeLifeImagesToLevelScreen() {
    //     if (this.life.naturalWidth > 0) {
    //         let x = 10;
    //         const y = this.life.height - 10;
    //         // Start a loop for each life in lives
    //         for (let life = 0; life < this.lives; life++) {
    //             // Draw the image at the curren x and y coordinates
    //             this.ctx.drawImage(this.life, x, y);
    //             // Increase the x-coordinate for the next image to draw
    //             x += this.life.width + 10;
    //         }
    //     }
    // }

    /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    /**
     * Writes text to the canvas
     * @param {string} text - Text to write
     * @param {number} fontSize - Font size in pixels
     * @param {number} xCoordinate - Horizontal coordinate in pixels
     * @param {number} yCoordinate - Vertical coordinate in pixels
     * @param {string} alignment - Where to align the text
     * @param {string} color - The color of the text
     */
    public writeTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
    ) {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}