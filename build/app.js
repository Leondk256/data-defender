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
class BlackholeScreen extends GameScreen {
    constructor(canvas, ctx, keyboardListener) {
        super(canvas, ctx);
        this.ship = new Ship(Game.currentId, `./assets/img/ship${Game.selectedShip}.png`, this.canvas.width / 6, this.canvas.height / 2, 5, 5, this.keyboardListener, 3);
    }
    draw() {
        this.writeTextToCanvas("Zwart gat", 50, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 15);
        this.writeTextToCanvas("Schiet op het juiste antwoord", 30, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 25);
        this.writeTextToCanvas(`${Game.globalPlayerName}`, 30, this.ship.getXPos(), this.ship.getYPos() - 50, "center");
        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);
    }
}
class GameObject {
    constructor(gameobjectId, imgUrl, xPos, yPos, xVel, yVel, health) {
        this.gameobjectId = gameobjectId;
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
    shootProjectileRightToLeft(canvas) {
        this.xPos -= this.xVel;
    }
    shootProjectileLeftToRight(canvas) {
        this.xPos += this.xVel;
    }
    inBounds(canvas) {
        return this.xPos >= -200 && this.xPos <= canvas.width &&
            this.yPos >= -200 && this.yPos <= canvas.height;
    }
    isCollidingWithProjectile(gameObject) {
        return this.yPos + this.img.height > gameObject.getYPos()
            && this.yPos < gameObject.getYPos() + gameObject.getImgHeight()
            && this.xPos + this.img.width > gameObject.getXPos()
            && this.xPos < gameObject.getXPos() + gameObject.getImgWidth();
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
    getXVel() {
        return this.xVel;
    }
    getYVel() {
        return this.yVel;
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
    getId() {
        return this.gameobjectId;
    }
}
class Projectile extends GameObject {
    constructor(projectileId, image, xPos, yPos, xVel, yVel, health) {
        super(projectileId, image, xPos, yPos, xVel, yVel, health);
    }
}
class FacebookBoss extends Projectile {
    constructor(id, image, xPos, yPos, xVel, yVel, health) {
        super(id, image, xPos, yPos, xVel, yVel, health);
        this.health = 100;
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
            && Game.blackholescreen === true) {
            this.currentScreen = new BlackholeScreen(this.canvas, this.ctx, this.keyboardListener);
        }
        if (this.currentScreen instanceof LevelScreen
            && Game.gameOverScreen === true) {
            this.currentScreen = new GameOverScreen(this.canvas, this.ctx, this.keyboardListener);
        }
    }
}
Game.currentId = 0;
let init = () => {
    const DD = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class GameOverScreen extends GameScreen {
    constructor(canvas, ctx, keyboardListener) {
        super(canvas, ctx);
    }
    draw() {
        this.writeTextToCanvas("GAME OVER", 80, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 15);
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
        this.gameTicker = 0;
        this.keyboardListener = keyboardListener;
        this.projectiles = [];
        this.playerProjectiles = [];
        this.facebookBoss = new FacebookBoss(Game.currentId, "./assets/img/gameobject/enemies/facebookbossr.png", this.canvas.width / 100 * 80, this.canvas.height / 100 * 50, 0, 10, 3);
        Game.currentId++;
        this.blackhole = new GameObject(Game.currentId, "./assets/img/blackhole.png", this.canvas.width / 100 * 95, this.canvas.height / 100 * 90, 0, 0, 1);
        Game.currentId++;
        this.ship = new Ship(Game.currentId, `./assets/img/ship${Game.selectedShip}.png`, this.canvas.width / 6, this.canvas.height / 2, 5, 5, this.keyboardListener, 3);
        Game.currentId++;
        this.startScreen = new StartScreen(this.canvas, this.ctx, 0);
    }
    draw() {
        this.gameTicker++;
        if (this.ship.isCollidingWithProjectile(this.facebookBoss) === true) {
            this.lives--;
        }
        Game.gameOverScreen = this.lives <= 0;
        Game.blackholescreen = this.ship.isCollidingWithProjectile(this.blackhole) === true;
        if (this.facebookBoss.getHealth() <= 0) {
            this.facebookBoss.setYPos(-1000);
            this.blackhole.draw(this.ctx);
        }
        else {
            this.facebookBoss.draw(this.ctx);
            this.facebookBoss.move(this.canvas);
        }
        this.writeTextToCanvas(`Health: ${this.facebookBoss.getHealth()}`, 30, this.facebookBoss.getXPos(), this.facebookBoss.getYPos() - 100, "center");
        this.writeTextToCanvas(`${Game.globalPlayerName}`, 30, this.ship.getXPos(), this.ship.getYPos() - 50, "center");
        if (this.gameTicker % 50 === 0) {
            this.projectiles.push(new Projectile(Game.currentId, "./assets/img/gameobject/projectiles/hostile/thumbsdownr.png", this.facebookBoss.getXPos() - 100, this.facebookBoss.getYPos(), 5, 0, 1));
            Game.currentId++;
        }
        this.projectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileRightToLeft(this.canvas);
                if (this.ship.isCollidingWithProjectile(projectile)) {
                    this.lives--;
                    for (let i = this.projectiles.length - 1; i >= 0; --i) {
                        this.projectiles = this.removeProjectilesWithId(this.projectiles, projectile.getId());
                    }
                }
            }
            else {
                for (let i = this.projectiles.length - 1; i >= 0; --i) {
                    this.projectiles = this.removeProjectilesWithId(this.projectiles, projectile.getId());
                }
            }
        });
        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.playerProjectiles.push(new Projectile(Game.currentId, "./assets/img/gameobject/projectiles/friendly/lvl1r.png", this.ship.getXPos() + 300, this.ship.getYPos(), 5, 0, 1));
        }
        console.log(this.lives);
        this.playerProjectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileLeftToRight(this.canvas);
                if (projectile.isCollidingWithProjectile(this.facebookBoss)) {
                    this.facebookBoss.setHealth(this.facebookBoss.getHealth() - 1);
                    this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                }
            }
        });
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    removeProjectilesWithId(projectiles, objectId) {
        return projectiles.filter(i => i['gameobjectId'] !== objectId);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Spacecomics`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class Ship extends GameObject {
    constructor(id, imgUrl, xPos, yPos, xVel, yVel, keyboardListener, health) {
        super(id, imgUrl, xPos, yPos, xVel, yVel, health);
        this.keyboardListener = new KeyboardListener();
        this.projectiles = [];
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
}
class StartScreen extends GameScreen {
    constructor(canvas, ctx, shipSelector) {
        super(canvas, ctx);
        this.mouseHandler = (event) => {
            if (event.clientX >= this.nameInputFieldX &&
                event.clientX < this.nameInputFieldX + this.nameInputField.width &&
                event.clientY >= this.nameInputFieldY &&
                event.clientY <= this.nameInputFieldY + this.nameInputField.width) {
                const PlayerName = prompt('wat is je naam?');
                console.log(typeof PlayerName);
                console.log(PlayerName);
                this.playerName = PlayerName;
                Game.globalPlayerName = this.playerName;
            }
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
        this.playerName = this.playerName;
        this.nameInputField = new Image();
        this.nameInputField.src = "./assets/img/buttons/nameinputfield.jpg";
        this.buttonRightX = (this.canvas.width / 100) * 55;
        this.buttonRightY = (this.canvas.height / 100) * 55;
        this.buttonLeftX = (this.canvas.width / 100) * 34.5;
        this.buttonLeftY = (this.canvas.height / 100) * 55;
        this.nameInputFieldX = (this.canvas.width / 100) * 50;
        this.nameInputFieldY = (this.canvas.height / 100) * 20;
        this.shipSelector = shipSelector;
        Game.selectedShip = this.shipSelector;
        document.addEventListener("click", this.mouseHandler);
        this.ships = [];
        for (let i = 0; i <= 2; i++) {
            this.ships.push(new Ship(Game.currentId, `./assets/img/ship${i}.png`, this.canvas.width / 2, (this.canvas.height / 100) * 65, 5, 5, this.keyboardListener, 5));
        }
        ;
    }
    draw() {
        this.writeTextToCanvas("Data Defender", 70, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 15);
        this.writeTextToCanvas("Start", 40, this.canvas.width / 2, (this.canvas.height / 100) * 90);
        this.writeTextToCanvas("Enter your name:", 30, (this.canvas.width / 2) - 155, (this.canvas.height / 100) * 25);
        this.writeTextToCanvas("Use the arrows to select your ship:", 30, this.canvas.width / 2, (this.canvas.height / 100) * 45);
        if (this.buttonRight.naturalWidth > 0 && this.buttonLeft.naturalWidth > 0) {
            this.ctx.drawImage(this.buttonRight, this.buttonRightX, this.buttonRightY);
            this.ctx.drawImage(this.buttonLeft, this.buttonLeftX, this.buttonLeftY);
            this.ctx.drawImage(this.nameInputField, this.nameInputFieldX, this.nameInputFieldY);
        }
        if (this.playerName != null) {
            this.writeTextToCanvas(this.playerName, 30, this.nameInputFieldX + this.nameInputField.width / 2, this.nameInputFieldY + this.nameInputField.height / 2, "center", "black");
        }
        this.ships[this.shipSelector].draw(this.ctx);
    }
    getShipSelector() {
        return this.shipSelector;
    }
}
//# sourceMappingURL=app.js.map