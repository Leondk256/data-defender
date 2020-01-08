class Game {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    public keyboardListener: KeyboardListener;
    public gameCounter: number;

    public static selectedShip: number;
    public static globalPlayerName: string;
    public static blackholescreen: boolean;
    public static blackholescreenIntoTiktok: Boolean;
    public static blackholescreenIntoYoutube: Boolean;
    public static blackholescreenIntoTitle: Boolean;
    public static stateCounter: number;
    public static stateCounter2: number;
    public static stateCounter3: number;
    public static gameOverScreen: boolean;
    public static currentId: number = 0;
    public static gameStarted: boolean;
    public static playerLives: number;
    public static blackholeScreenCounter: number;

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
        this.currentScreen = new StartScreen(this.canvas, this.ctx, null, null, null);
        // Call keyboard listener
        this.keyboardListener = new KeyboardListener();
        // Loop the game
        this.loop();
        // Count the ticks in the game
        this.gameCounter = 0;
        // Gamestartstate
        Game.gameStarted = false;
    }

    /**
     * Method game loop
     */
    public loop = () => {
        console.log(Game.blackholescreenIntoTiktok)
        console.log(Game.stateCounter);
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
    };

    private switchScreen() {
        // If the current screen is an instance of the StartScreen class
        // Basically: if the current screen is the start screen
        // And the user pressed "s", render the level screen
        if (
            this.currentScreen instanceof StartScreen
            && (Game.gameStarted === true || this.keyboardListener.isKeyDown(KeyboardListener.KEY_S))
        ) {
            // this.currentScreen = new FacebookLevel(this.canvas, this.ctx, this.keyboardListener, null, null);
            this.currentScreen = new FacebookLevel(this.canvas, this.ctx, this.keyboardListener, null, null);
            Game.gameOverScreen = false;
        }

        if (
            this.currentScreen instanceof TitleScreen
            && (Game.gameStarted === true || this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC))
        ) {
            this.currentScreen = new StartScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }

        if (
            this.currentScreen instanceof FacebookLevel && Game.blackholescreen === true) {
            this.currentScreen = new BlackholeScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }

        if (
            this.currentScreen instanceof YoutubeLevel
            && Game.blackholescreen === true) {
            this.currentScreen = new BlackholeScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }

        if (
            this.currentScreen instanceof BlackholeScreen 
            && Game.blackholescreenIntoTiktok === true) {
            this.currentScreen = new TiktokLevel(this.canvas, this.ctx, this.keyboardListener, null, null);
        }

        if (
            this.currentScreen instanceof BlackholeScreen 
            && Game.blackholescreenIntoYoutube === true) {
            this.currentScreen = new YoutubeLevel(this.canvas, this.ctx, this.keyboardListener, null, null);
        }

        if (
            this.currentScreen instanceof BlackholeScreen 
            && Game.blackholescreenIntoTitle === true) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }

        if (
            this.currentScreen instanceof FacebookLevel
            && Game.gameOverScreen === true) {
            this.currentScreen = new GameOverScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }

        if (
            this.currentScreen instanceof YoutubeLevel && Game.gameOverScreen === true) {
            this.currentScreen = new GameOverScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }

        if (
            this.currentScreen instanceof TiktokLevel
            && Game.blackholescreen === true) {
            this.currentScreen = new BlackholeScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }

        if (
            this.currentScreen instanceof TiktokLevel
            && Game.gameOverScreen === true) {
            this.currentScreen = new GameOverScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }

        if (
            this.currentScreen instanceof YoutubeLevel && Game.blackholescreen === true) {
            this.currentScreen = new BlackholeScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }

        if (
            Game.gameOverScreen === true && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) {
            this.currentScreen = new StartScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
    }
}

// This will get an HTML element. I cast this element in de appropriate type using <>
let init = () => {
    const DD = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);