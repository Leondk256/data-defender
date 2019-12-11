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
    move(canvas) {
        if (this.xPos + this.image.width > canvas.width ||
            this.xPos < 0) {
            this.xVel = -this.xVel;
        }
        if (this.yPos + this.image.height > canvas.height ||
            this.yPos < 0) {
            this.yVel = -this.yVel;
        }
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            console.log("YEET");
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScreen.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.currentScreen = new StartScreen(this.canvas, this.ctx);
        this.loop();
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
}
class LevelScreen {
}
class Ship extends GameObject {
    constructor(imgUrl, xPos, yPos, xVel, yVel, keyboardListener) {
        super(imgUrl, xPos, yPos, xVel, yVel);
        this.keyboardListener = keyboardListener;
    }
}
class StartScreen extends GameScreen {
    constructor(canvas, ctx) {
        super(canvas, ctx);
    }
    draw() {
        this.writeTextToCanvas("Data-Defender", 140, this.canvas.width / 2, 150);
        this.writeTextToCanvas("PRESS S TO PLAY", 40, this.canvas.width / 2, this.canvas.height / 2 - 20);
    }
}
//# sourceMappingURL=app.js.map