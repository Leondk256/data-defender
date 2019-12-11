class GameObject {
    constructor(imgUrl, xPos, yPos, xVel, yVel) {
        this.loadImage(imgUrl);
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
    }
    draw(ctx) {
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }
    move(canvas) {
        if (this.xPos + this.img.width / 2 > canvas.width ||
            this.xPos - this.img.width / 2 < 0) {
            this.xVel = -this.xVel;
        }
        if (this.yPos + this.img.height / 2 > canvas.height ||
            this.yPos - this.img.height / 2 < 0) {
            this.yVel = -this.yVel;
        }
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }
    loadImage(source) {
        this.img = new Image();
        this.img.src = source;
    }
}
class Enemy extends GameObject {
    constructor(image, xPos, yPos, xVel, yVel) {
        super(image, xPos, yPos, xVel, yVel);
    }
}
class FacebookBoss extends Enemy {
    constructor(image, xPos, yPos, xVel, yVel) {
        super(image, xPos, yPos, xVel, yVel);
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.switchScreen();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScreen.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.currentScreen = new StartScreen(this.canvas, this.ctx);
        this.keyboardListener = new KeyboardListener();
        this.loop();
    }
    switchScreen() {
        if (this.currentScreen instanceof StartScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_S)) {
            this.currentScreen = new LevelScreen(this.canvas, this.ctx, this.keyboardListener);
        }
        if (this.currentScreen instanceof LevelScreen
            && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) {
        }
    }
}
let init = () => {
    const DD = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class GameScreen {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    draw() { }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Spacecomics`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_ESC = 27;
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_S = 83;
class LevelScreen extends GameScreen {
    constructor(canvas, ctx, keyboardListener) {
        super(canvas, ctx);
        this.lives = 3;
        this.score = 400;
        this.keyboardListener = keyboardListener;
        this.facebookBoss = new FacebookBoss("./assets/images/enemy.png", 1500, 500, 0, 10);
        this.ship = new Ship("./assets/images/ship.png", this.canvas.width / 2, this.canvas.height / 2, 5, 5, this.keyboardListener);
    }
    draw() {
        this.facebookBoss.draw(this.ctx);
        this.facebookBoss.move(this.canvas);
        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);
        this.ship.shoot(this.ctx);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class Ship extends GameObject {
    constructor(imgUrl, xPos, yPos, xVel, yVel, keyboardListener) {
        super(imgUrl, xPos, yPos, xVel, yVel);
        this.keyboardListener = new KeyboardListener();
    }
    move(canvas) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)
            && this.xPos + this.img.width / 2 < canvas.width) {
            this.xPos += this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)
            && this.xPos - this.img.width / 2 > 0) {
            this.xPos -= this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)
            && this.yPos - this.img.height / 2 > 0) {
            this.yPos -= this.yVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)
            && this.yPos + this.img.height / 2 < canvas.height) {
            this.yPos += this.yVel;
        }
    }
    shoot(ctx) {
        this.gameObject = new GameObject("./assets/images/beam.png", this.xPos + 30, this.yPos, 0, 0);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.gameObject.draw(ctx);
        }
    }
}
class StartScreen extends GameScreen {
    constructor(canvas, ctx) {
        super(canvas, ctx);
    }
    draw() {
        this.writeTextToCanvas("Data Defender", 70, this.canvas.width / 2, 150);
        this.writeTextToCanvas("Start", 40, this.canvas.width / 2, 700);
        this.writeTextToCanvas("Enter your name:", 30, this.canvas.width / 3, 250);
        this.writeTextToCanvas("Use the arrows to select your ship ", 30, this.canvas.width / 2, 350);
    }
}
//# sourceMappingURL=app.js.map