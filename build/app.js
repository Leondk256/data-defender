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
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
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