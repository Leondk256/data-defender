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
    public static questionsArray: Array<{ question: string, correctAnswer: string }>;

    private currentScreen: GameScreen;

    public constructor(canvasId: HTMLCanvasElement) {
        // Add questions to array
        Game.questionsArray = [
            {
                question: 'Is het slim om met wie dan ook online gevoelige gegevens te delen?',
                correctAnswer: 'no'
            },
            {
                question: 'Je krijgt een vriendschapsverzoek van iemand die je niet kent, is het slim om deze te accepteren?',
                correctAnswer: 'no',

            },
            {
                question: 'Een willekeurig iemand op social media vraagt je een foto te sturen om je identiteit te bevestigen. \n Is het slim om deze actie uit te voeren?',
                correctAnswer: 'no'
            },
            {
                question: 'Is het slim om op elke website dezelfde wachtwoord te gebruiken?',
                correctAnswer: 'no'
            },
            {
                question: 'Is het verantwoord om je gegevens te delen met bekende bedrijven als bol.com?',
                correctAnswer: 'yes'
            },
            {
                question: 'Is het een goede idee om de online vriendschapsverzoek van een goede vriend te accepteren?',
                correctAnswer: 'yes'
            },
            {
                question: 'Accepteer je de uitnodiging als een vreemde vraagt om ergens met je te ontmoeten?',
                correctAnswer: 'no'
            },
            {
                question: 'Is het slim om je profiel goed af te schermen met privacy-instellingen?',
                correctAnswer: 'yes'
            },
            {
                question: 'Is het slim om een naaktfoto door te sturen naar iemand?',
                correctAnswer: 'no'
            },
            {
                question: 'Iemand die je niet kent stelt rare vragen aan je op het internet. \n Is het slim om deze persoon te blokkeren en rapporteren?',
                correctAnswer: 'yes'
            },
            {
                question: 'Is het slim om je gegevens op onveilige websites in te vullen(geen HTTPS)?',
                correctAnswer: 'no'
            },
            {
                question: 'Is het slim om iemand te cyberpesten?',
                correctAnswer: 'no'
            }
        ];

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
        // And the user pressed "s", render the Facebook level screen
        if (
            this.currentScreen instanceof StartScreen
            && (Game.gameStarted === true || this.keyboardListener.isKeyDown(KeyboardListener.KEY_S))
        ) {
            if (Game.globalPlayerName !== undefined) {
                this.currentScreen = new FacebookLevel(this.canvas, this.ctx, this.keyboardListener, null, null);
                Game.gameOverScreen = false;
            }
        }

        if (
            this.currentScreen instanceof TitleScreen
            && (Game.gameStarted === true || this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC))
        ) {
            this.currentScreen = new StartScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }

        if (
            this.currentScreen instanceof FacebookLevel
            && Game.blackholescreen === true) {
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
            this.currentScreen instanceof BlackholeScreen
            && Game.gameOverScreen === true) {
            this.currentScreen = new GameOverScreen(this.canvas, this.ctx, this.keyboardListener, null, null);

        }

        if (
            Game.gameOverScreen === true && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) {
            this.currentScreen = new StartScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
    }
}

// This will get an HTML element. I cast this element in the appropriate type using <>
let init = () => {
    const DD = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);