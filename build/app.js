class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.loop();
    }
}
let init = () => {
    const DD = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class GameObject {
    constructor(xPos, yPos, xVel, yVel, ctx, image) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.ctx = ctx;
        this.image = image;
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
    draw(ctx) {
    }
    loadImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class Ship extends GameObject {
}
//# sourceMappingURL=app.js.map