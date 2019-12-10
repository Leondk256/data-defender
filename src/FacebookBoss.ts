class FacebookBoss extends Enemy {
    protected xPos: number;
    protected yPos: number;
    protected xVel: number;
    protected yVel: number;
    protected image: HTMLImageElement;

    /**
     * 
     * @param image 
     * @param xPos 
     * @param yPos 
     * @param xVel 
     * @param yVel 
     */
    public constructor(image: string, xPos: number, yPos: number, xVel: number, yVel: number) {
        super(image, xPos, yPos, xVel, yVel);
    }

    /**
     * Method to move an an apple
     * @param canvas
     */
    public move(canvas: HTMLCanvasElement) {
        //check to see if the apple is within the screen
        if (
            this.xPos + this.image.width > canvas.width ||
            this.xPos < 0
        ) {
            this.xVel = -this.xVel;
        }
        if (
            this.yPos + this.image.height > canvas.height ||
            this.yPos < 0
        ) {
            this.yVel = - this.yVel;
        }
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }
}