class Game {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private keyboardListener: KeyboardListener;

    private ship: Ship;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        // Canvas width
        this.canvas.width = window.innerWidth;
        // Canvas height
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext("2d");
        // Create a ship
        this.ship = new Ship(
            "./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png",
            this.canvas.width / 2,
            this.canvas.height / 2,
            5,
            5,
            this.keyboardListener,
        );

        // Loop the game
        this.loop();
    }

    /**
     * Method game loop
     */
    public loop = () => {
        // Draw the ship
        this.ship.draw(this.ctx);
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Request the next animation frame
        requestAnimationFrame(this.loop);
    }
}

// This will get an HTML element. I cast this element in de appropriate type using <>
let init = () => {
    const DD = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);