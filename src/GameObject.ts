class GameObject {
    protected xPos: number;
    protected yPos: number;
    protected xVel: number;
    protected yVel: number;
    protected image: HTMLImageElement;
    protected ctx: CanvasRenderingContext2D;

    /**
     * Constructor
     * @param xPos number
     * @param yPos number
     * @param xVel number
     * @param yVel number
     * @param image HTMLImageElement
     */
    protected constructor(xPos: number, yPos: number, xVel: number, yVel: number, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.ctx = ctx;
        this.image = image;
    }

    /**
     * Method to move an object
     * @param canvas
     */
    private move(canvas: HTMLCanvasElement) {
        //check to see if the object is within the screen
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

    /**
     * Draw function
     * @param ctx Canvas rendering context
     */
    private draw(ctx: CanvasRenderingContext2D) {

    }

    /**
     * Method to load an image
     * @param {string} source
     * @returns {HTMLImageElement} - returns an image
     */
    private loadImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}