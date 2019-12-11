class Game {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    public keyboardListener: KeyboardListener;

    private ship: Ship;
    private currentScreen: StartScreen;
    private gameScreen: GameScreen;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        // Canvas width
        this.canvas.width = window.innerWidth;
        // Canvas height
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext("2d");
        // Set the current screen
        this.currentScreen = new StartScreen(this.canvas, this.ctx);

        // Create a ship
        this.ship = new Ship(
            "./assets/images/ship.png",
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
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the current screen
        this.currentScreen.draw();

        // Move the Ship
        this.ship.move(this.canvas);

        // Draw the Ship
        this.ship.draw(this.ctx);

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