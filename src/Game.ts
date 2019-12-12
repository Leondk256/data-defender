class Game {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    public keyboardListener: KeyboardListener;
    public gameCounter: number;

    public static selectedShip: number;

    private currentScreen: GameScreen;

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
        this.currentScreen = new StartScreen(this.canvas, this.ctx, 0);
        //call keyboard listener
        this.keyboardListener = new KeyboardListener();
        // Loop the game
        this.loop();
        // Count the ticks in the game
        this.gameCounter = 0;
    }

    /**
     * Method game loop
     */
    public loop = () => {
        //Count the ticks in the game
        this.gameCounter++;
        //Check which screen to draw
        this.switchScreen();

        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the current screen
        this.currentScreen.draw();

        // Request the next animation frame
        requestAnimationFrame(this.loop);
    }

    private switchScreen() {
        // If the current screen is an instance of the StartScreen class
        // Basically: if the current screen is the start screen
        // And the user pressed "s", render the level screen
        if (
            this.currentScreen instanceof StartScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)
        ) {
            this.currentScreen = new LevelScreen(this.canvas, this.ctx, this.keyboardListener);
        }

        if (
            this.currentScreen instanceof LevelScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)
        ) {
            // this.currentScreen = new TitleScreen(this.canvas, this.ctx);
        }
    }
}

// This will get an HTML element. I cast this element in de appropriate type using <>
let init = () => {
    const DD = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);