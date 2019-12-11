///<reference path="GameObject.ts"/>

class Ship extends GameObject {
    public keyboardListener: KeyboardListener;

    /**
     * Construct a new Ship object.
     *
     * @param imgUrl url of the image to load
     * @param xPos X coordinate of its starting position
     * @param yPos y coordinate of its starting position
     * @param xVel x part of the velocity vector
     * @param yVel y part of the velocity vector
     */
    public constructor(
        imgUrl: string,
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        keyboardListener: KeyboardListener,
    ) {
        super(imgUrl, xPos, yPos, xVel, yVel);
        this.keyboardListener = new KeyboardListener();
    }

    /**
     * Let the ship move with its own given speed. It should also handle the offscreen
     * events correctly.
     *
     * @param canvas the canvas
     */
    public move(canvas: HTMLCanvasElement) {
        // Move right if we're not at the right canvas border
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)
            && this.xPos + this.img.width / 2 < canvas.width
        ) {
            this.xPos += this.xVel;
        }

        // Move left if we're not at the left canvas border
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)
            && this.xPos - this.img.width / 2 > 0
        ) {
            this.xPos -= this.xVel;
        }

        // Move up if we're not at the top canvas border
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)
            && this.yPos - this.img.height / 2 > 0
        ) {
            this.yPos -= this.yVel;
        }

        // Move down if we're not at the bottom canvas border
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)
            && this.yPos + this.img.height / 2 < canvas.height
        ) {
            this.yPos += this.yVel;
        }
    }
}