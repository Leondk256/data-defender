class GameScreen {
    constructor(canvas, ctx, keyboardListener, ship, playerProjectiles) {
        this.playerProjectiles = [];
        this.canvas = canvas;
        this.ctx = ctx;
        this.ship = new Ship(Game.currentId, `./assets/img/ship${Game.selectedShip}.png`, this.canvas.width / 6, this.canvas.height / 2, 6, 6, this.keyboardListener, 3, 0, 0);
        Game.currentId++;
        this.yes = new GameObject(Game.currentId, "./assets/img/buttons/Yes.png", (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 40, 0, 0, 0, 0, 0);
        this.keyboardListener = new KeyboardListener;
        Game.currentId++;
        this.no = new GameObject(Game.currentId, "./assets/img/buttons/No.png", (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 80, 0, 0, 0, 0, 0);
        Game.currentId++;
        this.blackhole = new GameObject(Game.currentId, "./assets/img/environment/blackhole.png", this.canvas.width / 100 * 95, -1000, 0, 0, 1, 0, 0);
        this.friendlyProjectileArray = [
            "./assets/img/gameobject/projectiles/friendly/lvl1r.png",
            "./assets/img/gameobject/projectiles/friendly/lvl2r.png",
            "./assets/img/gameobject/projectiles/friendly/lvl3r.png"
        ];
        this.starsX = [(this.canvas.width / 100) * 25, (this.canvas.width / 100) * 10, (this.canvas.width / 100) * 90];
        this.starsY = [(this.canvas.height / 100) * 10, (this.canvas.height / 100) * 80, (this.canvas.height / 100) * 10];
        this.stars = [];
        for (let i = 0; i <= 2; i++) {
            this.stars.push(new GameObject(Game.currentId, `./assets/img/environment/stars/star${i}.png`, this.starsX[i], this.starsY[i], 0, 0, 0, 0, 0));
        }
        ;
        Game.currentId++;
        this.keyboardListener = new KeyboardListener;
    }
    draw() {
    }
    drawLives() {
        let color = "black";
        if (this.ship.getHealth() < 2) {
            color = "red";
        }
        this.writeTextToCanvas(`Levens: ${this.ship.getHealth()}`, 30, 90, 60, "center", color);
    }
    drawStars() {
        for (let i = 0; i <= 2; i++) {
            this.stars[i].draw(this.ctx);
        }
    }
    createGameObject(imgFileName, objectX, objectY, screenObjectArray) {
        screenObjectArray.push(new GameObject(Game.currentId, imgFileName, (this.canvas.width / 100) * objectX, (this.canvas.height / 100) * objectY, 0, 0, 0, 0, 0));
        Game.currentId++;
    }
    drawAllObjects(objectArray) {
        objectArray.forEach(element => {
            element.draw(this.ctx);
        });
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "black") {
        this.ctx.font = `${fontSize}px Spacecomics`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    writeMultipleTextLinesToCanvas(fontSize = 20, ctx, str, xPos, yPos, lineheight = 15) {
        this.ctx.font = `${fontSize}px Spacecomics`;
        let lines = str.split('\n');
        for (let j = 0; j < lines.length; j++) {
            ctx.fillText(lines[j], ((this.canvas.width / 100) * xPos), ((this.canvas.height / 100) * yPos) + (j * lineheight));
        }
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    removeProjectilesWithId(projectiles, objectId) {
        return projectiles.filter(i => i['gameobjectId'] !== objectId);
    }
}
class BlackholeScreen extends GameScreen {
    constructor(canvas, ctx, keyboardListener, ship, playerProjectiles) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
        this.cooldown = 0;
        Game.blackholeScreenCounter++;
        this.questionToAsk = this.randomNumber(0, Game.questionsArray.length - 1);
    }
    ;
    draw() {
        this.writeMultipleTextLinesToCanvas(30, this.ctx, Game.questionsArray[this.questionToAsk]['question'], 50, 60, 30);
        this.blackhole.draw(this.ctx);
        if (this.cooldown > 0) {
            this.cooldown--;
        }
        this.drawStars();
        this.yes.draw(this.ctx);
        this.no.draw(this.ctx);
        this.drawLives();
        this.writeTextToCanvas("Zwart gat", 50, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 15);
        this.writeTextToCanvas("Schiet op het juiste antwoord", 30, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 25);
        this.writeTextToCanvas(`${Game.globalPlayerName}`, 30, this.ship.getXPos(), this.ship.getYPos() - 50, "center");
        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);
        if (this.ship.getHealth() <= 0) {
            this.ship.setHealth(3);
            Game.gameOverScreen = true;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.cooldown === 0) {
            this.playerProjectiles.push(new Projectile(Game.currentId, "./assets/img/gameobject/projectiles/friendly/lvl1r.png", this.ship.getXPos() + 90, this.ship.getYPos(), 10, 0, 1, 0, 0));
            this.cooldown = 15;
            Game.currentId++;
        }
        if (this.ship.isCollidingWithProjectile(this.blackhole) === true && Game.stateCounter3 === 1) {
            Game.blackholescreenIntoTiktok = false;
            Game.blackholescreenIntoYoutube = false;
            Game.blackholescreenIntoTitle = true;
            Game.blackholescreen = false;
            Game.questionsArray.splice(this.questionToAsk, 1);
        }
        if (this.ship.isCollidingWithProjectile(this.blackhole) === true && Game.stateCounter2 === 1) {
            Game.blackholescreenIntoTiktok = false;
            Game.blackholescreenIntoYoutube = true;
            Game.blackholescreen = false;
            Game.stateCounter2 = 50;
            Game.stateCounter3 = 1;
            Game.questionsArray.splice(this.questionToAsk, 1);
        }
        if (this.ship.isCollidingWithProjectile(this.blackhole) === true && Game.stateCounter === 0) {
            Game.blackholescreen = false;
            Game.blackholescreenIntoTiktok = true;
            Game.blackholescreenIntoYoutube = false;
            Game.stateCounter = 50;
            Game.stateCounter2 = 1;
            Game.questionsArray.splice(this.questionToAsk, 1);
        }
        this.playerProjectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileLeftToRight(this.canvas);
                if (projectile.isCollidingWithProjectile(this.yes) && Game.questionsArray[this.questionToAsk]['correctAnswer'] === 'yes') {
                    this.blackhole.setYPos(this.canvas.height / 100 * 90);
                    this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                }
                else if (projectile.isCollidingWithProjectile(this.yes)) {
                    this.ship.setHealth(this.ship.getHealth() - 1);
                    this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                }
                if (projectile.isCollidingWithProjectile(this.no) && Game.questionsArray[this.questionToAsk]['correctAnswer'] === 'no') {
                    this.blackhole.setYPos(this.canvas.height / 100 * 90);
                    this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                }
                else if (projectile.isCollidingWithProjectile(this.no)) {
                    this.ship.setHealth(this.ship.getHealth() - 1);
                    this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                }
            }
        });
    }
}
class GameObject {
    constructor(gameobjectId, imgUrl, xPos, yPos, xVel, yVel, health, angle, moveAngle) {
        this.gameobjectId = gameobjectId;
        this.loadImage(imgUrl);
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.health = health;
        this.angle = angle;
        this.moveAngle = moveAngle;
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
    moveInCircles(canvas) {
        this.angle += this.moveAngle * Math.PI / 20;
        this.xPos -= this.xVel * Math.sin(this.angle);
        this.yPos -= this.yVel * Math.cos(this.angle);
    }
    tiktokBossMove(canvas) {
        if (this.xPos + this.img.width / 2 > canvas.width ||
            this.xPos - this.img.width / 2 < canvas.width / 2) {
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
    shootProjectileTopToBottom(canvas) {
        this.yPos += this.yVel;
    }
    shootProjectileBottomToTop(canvas) {
        this.yPos -= this.yVel;
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
    constructor(projectileId, image, xPos, yPos, xVel, yVel, health, angle, moveAngle) {
        super(projectileId, image, xPos, yPos, xVel, yVel, health, angle, moveAngle);
    }
}
class FacebookBoss extends Projectile {
    constructor(id, image, xPos, yPos, xVel, yVel, health, angle, moveAngle) {
        super(id, image, xPos, yPos, xVel, yVel, health, angle, moveAngle);
    }
}
class FacebookLevel extends GameScreen {
    constructor(canvas, ctx, keyboardListener, ship, playerProjectiles) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
        this.gameTicker = 0;
        this.projectiles = [];
        this.cooldown = 0;
        this.specialAttackTimer = 9000000000000000;
        this.specialAttackTimer2 = 9000000000000000;
        this.pleaseDontShootMrFacebookBossIDontFeelSoGood = 50;
        this.specialAttackState = false;
        this.facebookLevelObjects = [];
        this.facebookBoss = new FacebookBoss(Game.currentId, "./assets/img/gameobject/enemies/facebookbossr.png", this.canvas.width / 100 * 90, this.canvas.height / 100 * 50, 0, 10, 40, 0, 0);
        Game.currentId++;
        this.createGameObject("./assets/img/environment/thumbsupfb.png", 60, 20, this.facebookLevelObjects);
        this.createGameObject("./assets/img/environment/facebookplaneet1.png", 50, 80, this.facebookLevelObjects);
    }
    draw() {
        this.gameTicker++;
        if (this.cooldown > 0) {
            this.cooldown--;
        }
        this.drawStars();
        this.drawAllObjects(this.facebookLevelObjects);
        this.drawLives();
        if (this.ship.isCollidingWithProjectile(this.facebookBoss) === true) {
            this.ship.setHealth(this.ship.getHealth() - 1);
        }
        if (this.ship.getHealth() <= 0) {
            this.ship.setHealth(3);
            Game.gameOverScreen = true;
        }
        if (this.facebookBoss.getHealth() <= 0) {
            this.facebookLevelObjects.push(new GameObject(Game.currentId, "./assets/img/gameobject/projectiles/explosion2.png", this.facebookBoss.getXPos(), this.facebookBoss.getYPos(), 0, 10, 1, 0, 0));
            this.facebookBoss.setYPos(-1000);
            this.blackhole.draw(this.ctx);
            this.blackhole.setYPos(this.canvas.height / 100 * 90);
            if (this.ship.isCollidingWithProjectile(this.blackhole) === true) {
                Game.blackholescreen = true;
            }
        }
        else {
            this.facebookBoss.draw(this.ctx);
            this.facebookBoss.move(this.canvas);
        }
        this.writeTextToCanvas(`Levens: ${this.facebookBoss.getHealth()}`, 30, this.facebookBoss.getXPos(), this.facebookBoss.getYPos() - 100, "center");
        this.writeTextToCanvas(`${Game.globalPlayerName}`, 30, this.ship.getXPos(), this.ship.getYPos() - 50, "center");
        if (this.gameTicker % 200 === 0 && this.specialAttackState === false) {
            this.specialAttackState = true;
            this.specialAttackTimer2 = this.gameTicker;
            this.pleaseDontShootMrFacebookBossIDontFeelSoGood = 3;
        }
        if (this.gameTicker >= (this.specialAttackTimer2 + 30)) {
            this.pleaseDontShootMrFacebookBossIDontFeelSoGood = 50;
            this.specialAttackTimer2 = 500000;
            this.specialAttackState = false;
        }
        if (this.gameTicker % 300 === 0 && this.specialAttackState === false) {
            this.specialAttackState = true;
            this.specialAttackTimer = this.gameTicker;
            this.pleaseDontShootMrFacebookBossIDontFeelSoGood = 5000000;
            this.facebookBoss.setYVel(0);
            this.facebookBoss.setXVel(15);
        }
        if (this.facebookBoss.getXPos() === (this.canvas.width / 100) * 90 && this.gameTicker >= (this.specialAttackTimer + 120)) {
            2;
            this.facebookBoss.setXVel(0);
            this.facebookBoss.setYVel(10);
            this.facebookBoss.setXPos(this.canvas.width / 100 * 90);
            this.specialAttackTimer = 9000000000000000;
            this.pleaseDontShootMrFacebookBossIDontFeelSoGood = 50;
            this.specialAttackState = false;
        }
        if (this.gameTicker % this.pleaseDontShootMrFacebookBossIDontFeelSoGood === 0) {
            this.projectiles.push(new Projectile(Game.currentId, "./assets/img/gameobject/projectiles/hostile/thumbsdownr.png", this.facebookBoss.getXPos() - 100, this.facebookBoss.getYPos(), 5, 0, 1, 0, 0));
            Game.currentId++;
        }
        this.projectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileRightToLeft(this.canvas);
                if (this.ship.isCollidingWithProjectile(projectile)) {
                    this.ship.setHealth(this.ship.getHealth() - 1);
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
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.cooldown === 0) {
            this.playerProjectiles.push(new Projectile(Game.currentId, this.friendlyProjectileArray[0], this.ship.getXPos() + 90, this.ship.getYPos(), 10, 0, 1, 0, 0));
            this.cooldown = 15;
            Game.currentId++;
        }
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
                question: 'Is het een goede idee om de online vriendschapsverzoek \n van een goede vriend te accepteren?',
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
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.currentScreen = new StartScreen(this.canvas, this.ctx, null, null, null);
        this.keyboardListener = new KeyboardListener();
        this.loop();
        this.gameCounter = 0;
        Game.gameStarted = false;
    }
    switchScreen() {
        if (this.currentScreen instanceof StartScreen
            && (Game.gameStarted === true || this.keyboardListener.isKeyDown(KeyboardListener.KEY_S))) {
            if (Game.globalPlayerName !== undefined) {
                this.currentScreen = new FacebookLevel(this.canvas, this.ctx, this.keyboardListener, null, null);
                Game.gameOverScreen = false;
            }
        }
        if (this.currentScreen instanceof TitleScreen
            && (Game.gameStarted === true || this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC))) {
            this.currentScreen = new StartScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
        if (this.currentScreen instanceof FacebookLevel
            && Game.blackholescreen === true) {
            this.currentScreen = new BlackholeScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
        if (this.currentScreen instanceof YoutubeLevel
            && Game.blackholescreen === true) {
            this.currentScreen = new BlackholeScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
        if (this.currentScreen instanceof BlackholeScreen
            && Game.blackholescreenIntoTiktok === true) {
            this.currentScreen = new TiktokLevel(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
        if (this.currentScreen instanceof BlackholeScreen
            && Game.blackholescreenIntoYoutube === true) {
            this.currentScreen = new YoutubeLevel(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
        if (this.currentScreen instanceof BlackholeScreen
            && Game.blackholescreenIntoTitle === true) {
            this.currentScreen = new TitleScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
        if (this.currentScreen instanceof FacebookLevel
            && Game.gameOverScreen === true) {
            this.currentScreen = new GameOverScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
        if (this.currentScreen instanceof YoutubeLevel && Game.gameOverScreen === true) {
            this.currentScreen = new GameOverScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
        if (this.currentScreen instanceof TiktokLevel
            && Game.blackholescreen === true) {
            this.currentScreen = new BlackholeScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
        if (this.currentScreen instanceof TiktokLevel
            && Game.gameOverScreen === true) {
            this.currentScreen = new GameOverScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
        if (this.currentScreen instanceof YoutubeLevel && Game.blackholescreen === true) {
            this.currentScreen = new BlackholeScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
        if (this.currentScreen instanceof BlackholeScreen
            && Game.gameOverScreen === true) {
            this.currentScreen = new GameOverScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
        if (Game.gameOverScreen === true && this.keyboardListener.isKeyDown(KeyboardListener.KEY_ESC)) {
            this.currentScreen = new StartScreen(this.canvas, this.ctx, this.keyboardListener, null, null);
        }
    }
}
Game.currentId = 0;
let init = () => {
    const DD = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class GameOverScreen extends GameScreen {
    constructor(canvas, ctx, keyboardListener, ship, playerProjectiles) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
    }
    draw() {
        this.writeTextToCanvas("GAME OVER", 80, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 15);
        this.writeTextToCanvas("Druk op de esc knop om terug te gaan naar het hoofdmenu", 24, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 25);
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
KeyboardListener.KEY_LEFT = 65;
KeyboardListener.KEY_UP = 87;
KeyboardListener.KEY_RIGHT = 68;
KeyboardListener.KEY_DOWN = 83;
KeyboardListener.KEY_S = 83;
class Ship extends GameObject {
    constructor(id, imgUrl, xPos, yPos, xVel, yVel, keyboardListener, health, angle, moveAngle) {
        super(id, imgUrl, xPos, yPos, xVel, yVel, health, angle, moveAngle);
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
    constructor(canvas, ctx, keyboardListener, ship, playerProjectiles) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
        this.mouseHandler = (event) => {
            if (event.clientX >= this.nameInputFieldX &&
                event.clientX < this.nameInputFieldX + this.nameInputField.width &&
                event.clientY >= this.nameInputFieldY &&
                event.clientY <= this.nameInputFieldY + this.nameInputField.width) {
                if (this.playerName === undefined && Game.globalPlayerName === undefined) {
                    this.playerName = prompt('Wat is je naam?');
                    Game.globalPlayerName = this.playerName;
                }
            }
            if (event.clientX >= this.buttonRightX &&
                event.clientX < this.buttonRightX + this.buttonRight.width &&
                event.clientY >= this.buttonRightY &&
                event.clientY <= this.buttonRightY + this.buttonRight.width) {
                if (this.shipSelector === 3) {
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
                    this.shipSelector = 3;
                }
                else {
                    this.shipSelector -= 1;
                }
                Game.selectedShip = this.shipSelector;
            }
            if (event.clientX >= this.startButtonX &&
                event.clientX < this.startButtonX + this.startButton.width &&
                event.clientY >= this.startButtonY &&
                event.clientY <= this.startButtonY + this.startButton.width &&
                Game.globalPlayerName !== undefined) {
                Game.gameStarted = true;
            }
        };
        this.startScreenObjects = [];
        this.ships = [];
        this.buttonRight = new Image();
        this.buttonRight.src = "./assets/img/buttons/arrowRight.png";
        this.buttonLeft = new Image();
        this.buttonLeft.src = "./assets/img/buttons/arrowLeft.png";
        Game.gameStarted = false;
        Game.blackholescreen = false;
        Game.blackholescreenIntoYoutube = false;
        Game.blackholescreenIntoTiktok = false;
        Game.blackholescreenIntoTitle = false;
        Game.stateCounter = 0;
        Game.stateCounter2 = 0;
        Game.stateCounter3 = 0;
        Game.gameOverScreen = false;
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
                question: 'Is het een goede idee om de online vriendschapsverzoek \n van een goede vriend te accepteren?',
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
        Game.playerLives = 3;
        this.startButton = new Image();
        this.startButton.src = "./assets/img/buttons/startbutton.png";
        this.nameInputField = new Image();
        this.nameInputField.src = "./assets/img/buttons/nameinputfield.jpg";
        this.buttonRightX = (this.canvas.width / 100) * 55;
        this.buttonRightY = (this.canvas.height / 100) * 55;
        this.buttonLeftX = (this.canvas.width / 100) * 32;
        this.buttonLeftY = (this.canvas.height / 100) * 55;
        this.startButtonX = (this.canvas.width / 100) * 40;
        this.startButtonY = (this.canvas.height / 100) * 82;
        this.nameInputFieldX = (this.canvas.width / 100) * 50;
        this.nameInputFieldY = (this.canvas.height / 100) * 20;
        this.shipSelector = 0;
        Game.selectedShip = this.shipSelector;
        Game.blackholeScreenCounter = -1;
        document.addEventListener("click", this.mouseHandler);
        this.createGameObject("./assets/img/environment/facebookplaneet1.png", 10, 40, this.startScreenObjects);
        this.createGameObject("./assets/img/environment/tiktokplaneet.png", 75, 12, this.startScreenObjects);
        this.createGameObject("./assets/img/environment/youtubeplaneet.png", 30, 85, this.startScreenObjects);
        this.createGameObject("./assets/img/environment/thumbsupfb.png", 90, 85, this.startScreenObjects);
        this.createGameObject("./assets/img/environment/heart.png", 5, 10, this.startScreenObjects);
        this.createGameObject("./assets/img/environment/instadm.png", 90, 40, this.startScreenObjects);
        this.ships = [];
        for (let i = 0; i <= 3; i++) {
            this.ships.push(new Ship(Game.currentId, `./assets/img/ship${i}.png`, this.canvas.width / 2, (this.canvas.height / 100) * 66, 5, 5, this.keyboardListener, 5, 0, 0));
        }
    }
    draw() {
        this.writeTextToCanvas("Data Defender", 70, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 15);
        this.writeTextToCanvas("Vul je naam in:", 30, (this.canvas.width / 2) - 155, (this.canvas.height / 100) * 25);
        this.writeTextToCanvas("Klik op de de pijltjes om je schip te selecteren:", 30, this.canvas.width / 2, (this.canvas.height / 100) * 45);
        this.writeMultipleTextLinesToCanvas(20, this.ctx, 'Doel: \n\nVersla de sociale media!\n\n', 20, 60, 17);
        this.writeMultipleTextLinesToCanvas(20, this.ctx, 'Besturing:\n\nGebruik W, A, S en D om\n projectielen te ontwijken!\n\nGebruik spatiebalk om te schieten!', 80, 60, 17);
        if (this.buttonRight.naturalWidth > 0 && this.buttonLeft.naturalWidth > 0) {
            this.ctx.drawImage(this.buttonRight, this.buttonRightX, this.buttonRightY);
            this.ctx.drawImage(this.buttonLeft, this.buttonLeftX, this.buttonLeftY);
            this.ctx.drawImage(this.nameInputField, this.nameInputFieldX, this.nameInputFieldY);
            this.ctx.drawImage(this.startButton, this.startButtonX, this.startButtonY);
        }
        if (Game.globalPlayerName !== undefined) {
            this.writeTextToCanvas(Game.globalPlayerName, 30, this.nameInputFieldX + this.nameInputField.width / 2, this.nameInputFieldY + this.nameInputField.height / 2, "center", "black");
        }
        this.ships[this.shipSelector].draw(this.ctx);
        this.drawStars();
        this.drawAllObjects(this.startScreenObjects);
    }
}
class TiktokBoss extends Projectile {
    constructor(id, image, xPos, yPos, xVel, yVel, health, angle, moveAngle) {
        super(id, image, xPos, yPos, xVel, yVel, health, angle, moveAngle);
    }
}
class TiktokLevel extends GameScreen {
    constructor(canvas, ctx, keyboardListener, ship, playerProjectiles) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
        this.gameTicker = 0;
        this.projectiles = [];
        this.cooldown = 0;
        this.gameObjects = [];
        this.tiktokBoss = new TiktokBoss(Game.currentId, "./assets/img/gameobject/enemies/tiktokboss1.png", this.canvas.width / 100 * 90, this.canvas.height / 100 * 50, 6, 6, 40, 0, 40);
        this.tiktokObjects = [];
        this.createGameObject("./assets/img/environment/tiktokplaneet.png", 30, 40, this.tiktokObjects);
        this.createGameObject("./assets/img/environment/tiktokplaneet.png", 70, 60, this.tiktokObjects);
        this.createGameObject("./assets/img/environment/Heart.png", 50, 70, this.tiktokObjects);
        this.createGameObject("./assets/img/environment/Heart.png", 60, 15, this.tiktokObjects);
    }
    draw() {
        this.gameTicker++;
        if (this.cooldown > 0) {
            this.cooldown--;
        }
        let color = "black";
        if (this.ship.getHealth() < 2) {
            color = "red";
        }
        this.drawAllObjects(this.tiktokObjects);
        this.drawStars();
        this.drawLives();
        if (this.ship.isCollidingWithProjectile(this.tiktokBoss) === true) {
            this.ship.setHealth(this.ship.getHealth() - 1);
        }
        if (this.ship.getHealth() <= 0) {
            this.ship.setHealth(3);
            Game.gameOverScreen = true;
        }
        if (this.tiktokBoss.getHealth() <= 0) {
            this.tiktokObjects.push(new GameObject(Game.currentId, "./assets/img/gameobject/projectiles/explosion2.png", this.tiktokBoss.getXPos(), this.tiktokBoss.getYPos(), 0, 10, 1, 0, 0));
            this.tiktokBoss.setYPos(-1000);
            this.blackhole.draw(this.ctx);
            this.blackhole.setYPos(this.canvas.height / 100 * 90);
            if (this.ship.isCollidingWithProjectile(this.blackhole) === true) {
                Game.blackholescreen = true;
                Game.blackholescreenIntoTiktok = false;
                Game.blackholescreenIntoYoutube = false;
            }
        }
        else {
            this.tiktokBoss.draw(this.ctx);
            this.tiktokBoss.tiktokBossMove(this.canvas);
        }
        this.writeTextToCanvas(`Levens: ${this.tiktokBoss.getHealth()}`, 30, this.tiktokBoss.getXPos(), this.tiktokBoss.getYPos() - 100, "center");
        this.writeTextToCanvas(`${Game.globalPlayerName}`, 30, this.ship.getXPos(), this.ship.getYPos() - 50, "center");
        if (this.gameTicker % 45 === 0) {
            this.projectiles.push(new Projectile(Game.currentId, "./assets/img/gameobject/projectiles/hostile/music_note.png", this.tiktokBoss.getXPos() - 130, this.tiktokBoss.getYPos(), 5, 15, 1, 1, 1));
            Game.currentId++;
        }
        this.projectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileRightToLeft(this.canvas);
                projectile.moveInCircles(this.canvas);
                if (this.ship.isCollidingWithProjectile(projectile)) {
                    this.ship.setHealth(this.ship.getHealth() - 1);
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
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.cooldown === 0) {
            this.playerProjectiles.push(new Projectile(Game.currentId, this.friendlyProjectileArray[1], this.ship.getXPos() + 90, this.ship.getYPos(), 10, 0, 1, 0, 0));
            this.cooldown = 15;
            Game.currentId++;
        }
        this.gameObjects.forEach(element => {
            element.draw(this.ctx);
        });
        this.tiktokBoss.draw(this.ctx);
        this.playerProjectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileLeftToRight(this.canvas);
                if (projectile.isCollidingWithProjectile(this.tiktokBoss)) {
                    this.tiktokBoss.setHealth(this.tiktokBoss.getHealth() - 1);
                    this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                }
            }
        });
    }
}
class TitleScreen extends GameScreen {
    constructor(canvas, ctx, keyboardListener, ship, playerProjectiles) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
        this.ship.setXPos(this.canvas.width / 2);
        this.ship.setYPos(this.canvas.height / 4);
    }
    draw() {
        this.ship.draw(this.ctx);
        this.writeTextToCanvas("Data Defender", 70, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 15);
        this.writeMultipleTextLinesToCanvas(30, this.ctx, "Bedankt voor het spelen!\n We hopen dat je veel geleerd hebt en het een leuke game vond. :)", 50, 40, 30);
        this.writeTextToCanvas("Druk op esc als je opnieuw wilt beginnen", 20, (this.canvas.width / 100) * 50, (this.canvas.height / 100) * 80);
    }
}
class YoutubeBoss extends Projectile {
    constructor(id, image, xPos, yPos, xVel, yVel, health, angle, moveAngle) {
        super(id, image, xPos, yPos, xVel, yVel, health, angle, moveAngle);
    }
}
class YoutubeLevel extends GameScreen {
    constructor(canvas, ctx, keyboardListener, ship, playerProjectiles) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
        this.gameTicker = 0;
        this.projectiles = [];
        this.projectiles2 = [];
        this.projectiles3 = [];
        this.projectiles4 = [];
        this.cooldown = 0;
        this.youtubeLevelObjects = [];
        this.youtubeBoss = new YoutubeBoss(Game.currentId, "./assets/img/gameobject/enemies/youtubeboss1.png", this.canvas.width / 100 * 80, this.canvas.height / 100 * 50, 6, 11, 1, 1, 40);
        Game.currentId++;
        this.blackhole = new GameObject(Game.currentId, "./assets/img/environment/blackhole.png", this.canvas.width / 100 * 95, -1000, 0, 0, 1, 1, 1);
        Game.currentId++;
        this.createGameObject("./assets/img/environment/youtubeplaneet.png", 30, 85, this.youtubeLevelObjects);
        this.createGameObject("./assets/img/environment/youtubeplaneet.png", 70, 30, this.youtubeLevelObjects);
        this.createGameObject("./assets/img/environment/heart.png", 25, 30, this.youtubeLevelObjects);
        this.createGameObject("./assets/img/environment/heart.png", 65, 80, this.youtubeLevelObjects);
    }
    draw() {
        this.gameTicker++;
        if (this.cooldown > 0) {
            this.cooldown--;
        }
        this.drawStars();
        this.drawAllObjects(this.youtubeLevelObjects);
        let color = "black";
        if (this.ship.getHealth() < 2) {
            color = "red";
        }
        Game.blackholescreen = this.ship.isCollidingWithProjectile(this.blackhole) === true;
        this.writeTextToCanvas(`Levens: ${this.ship.getHealth()}`, 30, 90, 60, "center", color);
        this.writeTextToCanvas(`${Game.globalPlayerName}`, 30, this.ship.getXPos(), this.ship.getYPos() - 50, "center");
        if (this.ship.getHealth() <= 0) {
            this.ship.setHealth(3);
            Game.gameOverScreen = true;
        }
        if (this.gameTicker % 50 === 0) {
            this.projectiles.push(new Projectile(Game.currentId, "./assets/img/gameobject/projectiles/hostile/youtube_boss_projectile.png", this.youtubeBoss.getXPos() - 100, this.youtubeBoss.getYPos(), 5, 0, 1, 1, 1));
            Game.currentId++;
        }
        if (this.gameTicker % 50 === 0) {
            this.projectiles2.push(new Projectile(Game.currentId, "./assets/img/gameobject/projectiles/hostile/youtube_boss_projectile.png", this.youtubeBoss.getXPos() + 100, this.youtubeBoss.getYPos(), 5, 0, 1, 1, 1));
            Game.currentId++;
        }
        if (this.gameTicker % 100 === 0) {
            this.projectiles3.push(new Projectile(Game.currentId, "./assets/img/gameobject/projectiles/hostile/youtube_boss_projectile.png", this.youtubeBoss.getXPos(), this.youtubeBoss.getYPos() + 100, 0, 5, 1, 1, 1));
            Game.currentId++;
        }
        if (this.gameTicker % 100 === 0) {
            this.projectiles4.push(new Projectile(Game.currentId, "./assets/img/gameobject/projectiles/hostile/youtube_boss_projectile.png", this.youtubeBoss.getXPos(), this.youtubeBoss.getYPos() - 100, 0, 5, 1, 1, 1));
            Game.currentId++;
        }
        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);
        if (this.ship.isCollidingWithProjectile(this.youtubeBoss) === true) {
            this.ship.setHealth(this.ship.getHealth() - 1);
        }
        if (this.ship.getHealth() <= 0) {
            this.ship.setHealth(3);
            Game.gameOverScreen = true;
        }
        if (this.youtubeBoss.getHealth() <= 0) {
            this.youtubeLevelObjects.push(new GameObject(Game.currentId, "./assets/img/gameobject/projectiles/explosion2.png", this.youtubeBoss.getXPos(), this.youtubeBoss.getYPos(), 0, 10, 1, 0, 0));
            this.youtubeBoss.setYPos(-1000);
            this.blackhole.draw(this.ctx);
            this.blackhole.setYPos(this.canvas.height / 100 * 90);
            if (this.ship.isCollidingWithProjectile(this.blackhole) === true) {
                Game.blackholescreen = true;
                Game.blackholescreenIntoYoutube = false;
            }
        }
        else {
            this.youtubeBoss.draw(this.ctx);
            this.youtubeBoss.move(this.canvas);
        }
        this.writeTextToCanvas(`Levens: ${this.youtubeBoss.getHealth()}`, 30, this.youtubeBoss.getXPos(), this.youtubeBoss.getYPos() - 100, "center");
        this.projectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileRightToLeft(this.canvas);
                if (this.ship.isCollidingWithProjectile(projectile)) {
                    this.ship.setHealth(this.ship.getHealth() - 1);
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
        this.projectiles2.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileLeftToRight(this.canvas);
                if (this.ship.isCollidingWithProjectile(projectile)) {
                    this.ship.setHealth(this.ship.getHealth() - 1);
                    for (let i = this.projectiles2.length - 1; i >= 0; --i) {
                        this.projectiles2 = this.removeProjectilesWithId(this.projectiles2, projectile.getId());
                    }
                }
            }
            else {
                for (let i = this.projectiles2.length - 1; i >= 0; --i) {
                    this.projectiles2 = this.removeProjectilesWithId(this.projectiles2, projectile.getId());
                }
            }
        });
        this.projectiles3.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileTopToBottom(this.canvas);
                if (this.ship.isCollidingWithProjectile(projectile)) {
                    this.ship.setHealth(this.ship.getHealth() - 1);
                    for (let i = this.projectiles3.length - 1; i >= 0; --i) {
                        this.projectiles3 = this.removeProjectilesWithId(this.projectiles3, projectile.getId());
                    }
                }
            }
            else {
                for (let i = this.projectiles3.length - 1; i >= 0; --i) {
                    this.projectiles3 = this.removeProjectilesWithId(this.projectiles3, projectile.getId());
                }
            }
        });
        this.projectiles4.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileBottomToTop(this.canvas);
                if (this.ship.isCollidingWithProjectile(projectile)) {
                    this.ship.setHealth(this.ship.getHealth() - 1);
                    for (let i = this.projectiles4.length - 1; i >= 0; --i) {
                        this.projectiles4 = this.removeProjectilesWithId(this.projectiles4, projectile.getId());
                    }
                }
            }
            else {
                for (let i = this.projectiles4.length - 1; i >= 0; --i) {
                    this.projectiles4 = this.removeProjectilesWithId(this.projectiles4, projectile.getId());
                }
            }
        });
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.cooldown === 0) {
            this.playerProjectiles.push(new Projectile(Game.currentId, this.friendlyProjectileArray[2], this.ship.getXPos() + 90, this.ship.getYPos(), 10, 0, 1, 1, 1));
            this.cooldown = 15;
            Game.currentId++;
        }
        this.playerProjectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileLeftToRight(this.canvas);
                if (projectile.isCollidingWithProjectile(this.youtubeBoss)) {
                    this.youtubeBoss.setHealth(this.youtubeBoss.getHealth() - 1);
                    this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                }
            }
        });
    }
}
//# sourceMappingURL=app.js.map