class GameScreen {
    protected readonly canvas: HTMLCanvasElement;
    protected readonly ctx: CanvasRenderingContext2D;
    protected playerProjectiles: Projectile[];
    protected keyboardListener: KeyboardListener;
    protected ship: Ship;
    protected blackhole: GameObject;
    protected stars: GameObject[];
    protected starsX: number[];
    protected starsY: number[];
    protected yes: GameObject;
    protected no: GameObject;
    protected friendlyProjectileArray: string[];

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener, ship: Ship, playerProjectiles: Projectile) {
        this.playerProjectiles = [];
        this.canvas = canvas;
        this.ctx = ctx;
        // Create a ship
        this.ship = new Ship(
            Game.currentId,
            `./assets/img/ship${Game.selectedShip}.png`,
            this.canvas.width / 6,
            this.canvas.height / 2,
            6,
            6,
            this.keyboardListener,
            3,
            0,
            0
        );

        Game.currentId++;

        this.yes = new GameObject(
            Game.currentId,
            "./assets/img/buttons/Yes.png",
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 40,
            0,
            0,
            0,
            0,
            0
        );

        this.keyboardListener = new KeyboardListener;

        Game.currentId++;

        this.no = new GameObject(
            Game.currentId,
            "./assets/img/buttons/No.png",
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 80,
            0,
            0,
            0,
            0,
            0
        );

        Game.currentId++;

        this.blackhole = new GameObject(
            Game.currentId,
            "./assets/img/environment/blackhole.png",
            this.canvas.width / 100 * 95,
            -1000,
            0,
            0,
            1,
            0,
            0
        );
        this.friendlyProjectileArray = [
            "./assets/img/gameobject/projectiles/friendly/lvl1r.png",
            "./assets/img/gameobject/projectiles/friendly/lvl2r.png",
            "./assets/img/gameobject/projectiles/friendly/lvl3r.png"
        ]

        //decide where the default star position is on all screens
        this.starsX = [(this.canvas.width / 100) * 25, (this.canvas.width / 100) * 10, (this.canvas.width / 100) * 90]
        this.starsY = [(this.canvas.height / 100) * 10, (this.canvas.height / 100) * 80, (this.canvas.height / 100) * 10]

        // Add stars to the stars array
        this.stars = [];
        for (let i = 0; i <= 2; i++) {
            this.stars.push(
                new GameObject(
                    Game.currentId,
                    `./assets/img/environment/stars/star${i}.png`,
                    this.starsX[i],
                    this.starsY[i],
                    0,
                    0,
                    0,
                    0,
                    0
                )
            )
        };


        Game.currentId++;

        this.keyboardListener = new KeyboardListener;
    }

    public draw() {
    }

    public drawLives() {
        // Set the standard text color to white
        let color = "black";

        // Set the text color to red if the player only has 1 live left
        if (this.ship.getHealth() < 2) {
            color = "red";
        }

        // Write the lives on the top left of the screen
        this.writeTextToCanvas(
            `Levens: ${this.ship.getHealth()}`,
            30,
            90,
            60,
            "center",
            color,
        );
    }

    //use this function to draw stars on your desired screen
    public drawStars() {
        for (let i = 0; i <= 2; i++) {
            this.stars[i].draw(this.ctx)
        }
    }


    /**
     * 
     * @param imgFileName Object image file path
     * @param objectX Percentage position of the width of the screen
     * @param objectY Percentage position of the height of the screen
     * @param screenObjectArray Array of Gameobjects for the present screen in which to put the create GameObjects
     */

    public createGameObject(
        imgFileName: string,
        objectX: number,
        objectY: number,
        screenObjectArray: GameObject[]
    ) {
        screenObjectArray.push(
            new GameObject(
                Game.currentId,
                imgFileName,
                (this.canvas.width / 100) * objectX,
                (this.canvas.height / 100) * objectY,
                0,
                0,
                0,
                0,
                0
            )
        )
    }

    public drawAllObjects(
        objectArray: GameObject[],
    ) {
        objectArray.forEach(element => {
            element.draw(this.ctx)
        });
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
    protected writeTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "black",
    ) {
        this.ctx.font = `${fontSize}px Spacecomics`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }

    /**
     * 
     * @param ctx : Canvasrenderingcontext to write on.
     * @param str : The string to write if you want a new line use \n.
     * @param xPos : Xposition of the text.
     * @param yPos : Ypostition of the text.
     * @param lineheight : How large the linebreaks or 'enters' should be.
     */
    protected writeMultipleTextLinesToCanvas(
        fontSize: number = 20,
        ctx: CanvasRenderingContext2D,
        str: string,
        xPos: number,
        yPos: number,
        lineheight: number = 15
    ) {
        // based on https://www.tutorialspoint.com/HTML5-canvas-ctx-fillText-won-t-do-line-breaks
        this.ctx.font = `${fontSize}px Spacecomics`;

        // use \n as a delimiter (you can choose any delimter), the split function uses this delimiter to cut the string into two strings
        // lines is an array with all the strings
        let lines = str.split('\n');

        // loop over all the strings and write each string a number of lineheights under eacht oter 
        for (let j = 0; j < lines.length; j++) {
            ctx.fillText(lines[j], ((this.canvas.width / 100) * xPos), ((this.canvas.height / 100) * yPos) + (j * lineheight));
        }
    }


    /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    protected randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    /**
     * Remove enemy projectiles with specific id
     * @param projectiles 
     * @param objectId 
     */
    protected removeProjectilesWithId(projectiles: Projectile[], objectId: number): Projectile[] {
        return projectiles.filter(i => i['gameobjectId'] !== objectId);
    }
}