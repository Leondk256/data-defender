///<reference path="GameObject.ts"/>

class Ship extends GameObject {
    private keyboardListener: KeyboardListener;
    private gameObject: GameObject;

    /**
     *
     * @param imgUrl
     * @param xPos
     * @param yPos
     * @param xVel
     * @param yVel
     * @param keyboardListener
     * @param health
     */
    public constructor(
        imgUrl: string,
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        keyboardListener: KeyboardListener,
        health: number,
    ) {
        super(imgUrl, xPos, yPos, xVel, yVel, health);
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

    /**
     * Shoot with Ship functionality
     * @param ctx
     * @param gameObject
     */
    public shoot(ctx: CanvasRenderingContext2D, gameObject: GameObject) {
        // Create laser when spacebar pressed
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            // Create the laser gameObject
            this.gameObject = new GameObject(
                "./assets/images/beam.png",
                this.xPos + 30,
                this.yPos,
                0,
                0,
                3,
            );
            // Draw it after it has been created
            this.gameObject.draw(ctx);

            // Check if the laser shot hits the facebook boss
            if (this.gameObject.getYPos() + this.gameObject.getImgHeight() > gameObject.getYPos()
                && this.gameObject.getYPos() < gameObject.getYPos() + gameObject.getImgHeight()
                && this.gameObject.getXPos() + this.gameObject.getImgWidth() > gameObject.getXPos()
                && this.gameObject.getXPos() < gameObject.getXPos() + gameObject.getImgWidth()
            ) {
                // Subtract one health when beamed by laser
                gameObject.setHealth(gameObject.getHealth() - 1);
            }
        }
    }

    /**
     * Check if the Ship is colliding with a projectile
     * @param gameObject
     */
    public isCollidingWithProjectile(gameObject: GameObject): boolean {
        return this.yPos + this.img.height > gameObject.getYPos()
            && this.yPos < gameObject.getYPos() + gameObject.getImgHeight()
            && this.xPos + this.img.width > gameObject.getXPos()
            && this.xPos < gameObject.getXPos() + gameObject.getImgWidth();
    }
}