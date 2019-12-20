class GameScreen {
    protected readonly canvas: HTMLCanvasElement;
    protected readonly ctx: CanvasRenderingContext2D;
    protected playerProjectiles: Projectile[];
    protected keyboardListener: KeyboardListener;
    protected ship: Ship;
    protected blackhole: GameObject;
    protected yes: GameObject;
    protected no: GameObject;

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
        );

        Game.currentId++;

        this.yes = new GameObject(
            Game.currentId,
            "./assets/img/environment/facebookplaneet1.png",
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 40,
            0,
            0,
            0
        );
        this.keyboardListener = new KeyboardListener;

        Game.currentId++;

        this.no = new GameObject(
            Game.currentId,
            "./assets/img/environment/facebookplaneet1.png",
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 80,
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
            1
        );

        Game.currentId++;

        this.keyboardListener = new KeyboardListener;
    }

    public draw() { }

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