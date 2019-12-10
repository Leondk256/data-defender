class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ship.draw(this.ctx);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.ship = new Ship("./assets/images/ship.png", this.canvas.width / 2, this.canvas.height / 2, 5, 5, this.keyboardListener);
        this.loop();
    }
}
let init = () => {
    const DD = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class GameObject {
    constructor(imgUrl, xPos, yPos, xVel, yVel) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.loadImage(imgUrl);
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
class KeyboardListener {
}
class Ship extends GameObject {
    constructor(imgUrl, xPos, yPos, xVel, yVel, keyboardListener) {
        super(imgUrl, xPos, yPos, xVel, yVel);
        this.keyboardListener = keyboardListener;
    }
}
//# sourceMappingURL=app.js.map