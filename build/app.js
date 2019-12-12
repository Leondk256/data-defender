class GameObject {
    constructor(imgUrl, xPos, yPos, xVel, yVel, health) {
        this.loadImage(imgUrl);
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.health = health;
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
    setXPos(xPos) {
        this.xPos = xPos;
    }
    getXPos() {
        return this.xPos;
    }
    setYPos(yPos) {
        this.yPos = yPos;
    }
    getYPos() {
        return this.yPos;
    }
    getImgWidth() {
        return this.img.width;
    }
    getImgHeight() {
        return this.img.height;
    }
    setXVel(xVel) {
        this.xVel = xVel;
    }
    setYVel(yVel) {
        this.yVel = yVel;
    }
    setHealth(health) {
        this.health = health;
    }
    getHealth() {
        return this.health;
    }
}
class Projectile extends GameObject {
    constructor(image, xPos, yPos, xVel, yVel, health) {
        super(image, xPos, yPos, xVel, yVel, health);
    }
}
class FacebookBoss extends Projectile {
    constructor(image, xPos, yPos, xVel, yVel, health) {
        super(image, xPos, yPos, xVel, yVel, health);
        this.projectileXPos = this.xPos - 350;
        this.projectileYPos = this.yPos;
        this.health = 5;
    }
    shoot(ctx) {
        for (let index = 0; index < 5; index++) {
            this.projectile = new Projectile("./assets/img/beam.png", this.projectileXPos, this.projectileYPos, 0, 0, 5);
            this.projectile.draw(ctx);
            this.projectileXPos -= 5;
        }
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.gameCounter++;
            this.switchScreen();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScreen.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.currentScreen = new StartScreen(this.canvas, this.ctx, 0);
        this.keyboardListener = new KeyboardListener();
        this.loop();
        this.gameCounter = 0;
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
        this.facebookBoss = new FacebookBoss("./assets/img/enemy.png", this.canvas.width / 100 * 80, this.canvas.height / 100 * 50, 0, 10, 3);
        this.ship = new Ship(`./assets/img/ship${Game.selectedShip}.png`, this.canvas.width / 2, this.canvas.height / 2, 5, 5, this.keyboardListener, 3);
        this.startScreen = new StartScreen(this.canvas, this.ctx, 0);
    }
    draw() {
        if (this.ship.isCollidingWithProjectile(this.facebookBoss) === true) {
            this.lives--;
            if (this.lives <= 0) {
            }
        }
        if (this.facebookBoss.getHealth() <= 0) {
            this.facebookBoss.setYPos(-1000);
        }
        else {
            this.facebookBoss.draw(this.ctx);
            this.facebookBoss.move(this.canvas);
            this.facebookBoss.shoot(this.ctx);
        }
        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);
        this.ship.shoot(this.ctx, this.facebookBoss);
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
    constructor(imgUrl, xPos, yPos, xVel, yVel, keyboardListener, health) {
        super(imgUrl, xPos, yPos, xVel, yVel, health);
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
    shoot(ctx, gameObject) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.gameObject = new GameObject("./assets/img/beam2.png", this.xPos + 30, this.yPos, 0, 0, 0);
            this.gameObject.draw(ctx);
            if (this.gameObject.getYPos() + this.gameObject.getImgHeight() > gameObject.getYPos()
                && this.gameObject.getYPos() < gameObject.getYPos() + gameObject.getImgHeight()
                && this.gameObject.getXPos() + this.gameObject.getImgWidth() > gameObject.getXPos()
                && this.gameObject.getXPos() < gameObject.getXPos() + gameObject.getImgWidth()) {
                gameObject.setHealth(gameObject.getHealth() - 1);
            }
        }
    }
    isCollidingWithProjectile(gameObject) {
        return this.yPos + this.img.height > gameObject.getYPos()
            && this.yPos < gameObject.getYPos() + gameObject.getImgHeight()
            && this.xPos + this.img.width > gameObject.getXPos()
            && this.xPos < gameObject.getXPos() + gameObject.getImgWidth();
    }
}
class StartScreen extends GameScreen {
    constructor(canvas, ctx, shipSelector) {
        super(canvas, ctx);
        this.mouseHandler = (event) => {
            if (event.clientX >= this.buttonRightX &&
                event.clientX < this.buttonRightX + this.buttonRight.width &&
                event.clientY >= this.buttonRightY &&
                event.clientY <= this.buttonRightY + this.buttonRight.width) {
                if (this.shipSelector === 2) {
                    this.shipSelector = 0;
                }
                else {
                    this.shipSelector += 1;
                }
                Game.selectedShip = this.shipSelector;
            }
            if (event.clientX >= this.buttonLeftX &&
                event.clientX < this.buttonLeftX + this.buttonLeft.width &&
                event.clientY >= this.buttonLeftY &&
                event.clientY <= this.buttonLeftY + this.buttonLeft.width) {
                if (this.shipSelector === 0) {
                    this.shipSelector = 2;
                }
                else {
                    this.shipSelector -= 1;
                }
                Game.selectedShip = this.shipSelector;
            }
        };
        this.buttonRight = new Image();
        this.buttonRight.src = "./assets/img/buttons/arrowRight.png";
        this.buttonLeft = new Image();
        this.buttonLeft.src = "./assets/img/buttons/arrowLeft.png";
        this.buttonRightX = (this.canvas.width / 100) * 70;
        this.buttonRightY = (this.canvas.height / 100) * 55;
        this.buttonLeftX = (this.canvas.width / 100) * 35;
        this.buttonLeftY = (this.canvas.height / 100) * 55;
        this.shipSelector = shipSelector;
        Game.selectedShip = this.shipSelector;
        document.addEventListener("click", this.mouseHandler);
        this.ships = [];
        for (let i = 0; i <= 2; i++) {
            this.ships.push(new Ship(`./assets/img/ship${i}.png`, this.canvas.width / 2, (this.canvas.height / 100) * 65, 5, 5, this.keyboardListener, 5));
        }
        ;
    }
    draw() {
        this.writeTextToCanvas("Data Defender", 70, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 15);
        this.writeTextToCanvas("Start", 40, this.canvas.width / 2, (this.canvas.height / 100) * 90);
        this.writeTextToCanvas("Enter your name:", 30, this.canvas.width / 3, (this.canvas.height / 100) * 30);
        this.writeTextToCanvas("Use the arrows to select your ship:", 30, this.canvas.width / 2, (this.canvas.height / 100) * 45);
        if (this.buttonRight.naturalWidth > 0 && this.buttonLeft.naturalWidth > 0) {
            this.ctx.drawImage(this.buttonRight, this.buttonRightX - this.buttonRight.width / 2, this.buttonRightY);
            this.ctx.drawImage(this.buttonLeft, this.buttonLeftX - this.buttonLeft.width / 2, this.buttonLeftY);
        }
        this.ships[this.shipSelector].draw(this.ctx);
    }
    getShipSelector() {
        return this.shipSelector;
    }
}
//# sourceMappingURL=app.js.map