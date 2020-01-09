class GameObject {
    protected gameobjectId: number;
    protected xPos: number;
    protected yPos: number;
    protected xVel: number;
    protected yVel: number;
    protected img: HTMLImageElement;
    protected health: number;
    protected angle: number;
    protected moveAngle: number;

    /**
     * constructor
     * @param gameobjectId 
     * @param imgUrl 
     * @param xPos 
     * @param yPos 
     * @param xVel 
     * @param yVel 
     * @param health 
     * @param angle 
     * @param moveAngle 
     */
    public constructor(
        gameobjectId: number,
        imgUrl: string,
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        health: number,
        angle: number,
        moveAngle: number
    ) {
        this.gameobjectId = gameobjectId;
        this.loadImage(imgUrl);
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.health = health;
        this.angle = angle;
        this.moveAngle = moveAngle
    }

    /**
     * Let the image draw itself on the correct position on the given
     * CanvasRenderingContext2D.
     *
     * @param ctx The CanvasRenderingContext2D to draw to
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // We want the center of the image to be the position of this asteroid
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;

        // If the image is not yet loaded, don't draw anything
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }

    /**
     * Let the game object move itself with its own given speed. It should also handle the offscreen
     * events correctly
     *
     * @param canvas the canvas
     */
    public move(canvas: HTMLCanvasElement) {
        if (
            this.xPos + this.img.width / 2 > canvas.width ||
            this.xPos - this.img.width / 2 < 0
        ) {
            this.xVel = -this.xVel;
        }
        if (
            this.yPos + this.img.height / 2 > canvas.height ||
            this.yPos - this.img.height / 2 < 0
        ) {
            this.yVel = -this.yVel;
        }

        // Use the velocity to change the position
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }

    /**
     * Make object move in circles
     * @param canvas the canvas
     */
    public moveInCircles(canvas: HTMLCanvasElement) {
        this.angle += this.moveAngle * Math.PI / 20;
        this.xPos -= this.xVel * Math.sin(this.angle);
        this.yPos -= this.yVel * Math.cos(this.angle);
    }

    /**
     * Let the game object move itself with its own given speed. It should also handle the offscreen
     * events correctly
     *
     * @param canvas the canvas
     */
    public tiktokBossMove(canvas: HTMLCanvasElement) {
        if (
            this.xPos + this.img.width / 2 > canvas.width ||
            this.xPos - this.img.width / 2 < canvas.width / 2
        ) {
            this.xVel = -this.xVel;
        }
        if (
            this.yPos + this.img.height / 2 > canvas.height ||
            this.yPos - this.img.height / 2 < 0
        ) {
            this.yVel = -this.yVel;
        }

        // Use the velocity to change the position
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }

    /**
     * Shoot a projectile
     *
     * @param canvas the canvas
     */
    public shootProjectileRightToLeft(canvas: HTMLCanvasElement) {
        // Use the velocity to change the position
        this.xPos -= this.xVel;
    }

    /**
     * Shoot a projectile
     *
     * @param canvas the canvas
     */
    public shootProjectileLeftToRight(canvas: HTMLCanvasElement) {
        // Use the velocity to change the position
        this.xPos += this.xVel;
    }

    /**
     * Check if object is inside canvas
     */
    public inBounds(canvas: HTMLCanvasElement) {
        return this.xPos >= -200 && this.xPos <= canvas.width &&
            this.yPos >= -200 && this.yPos <= canvas.height;
    }

    /**
     * Check if projectile collides with game object
     * @param gameObject
     */
    public isCollidingWithProjectile(gameObject: GameObject): boolean {
        return this.yPos + this.img.height > gameObject.getYPos()
            && this.yPos < gameObject.getYPos() + gameObject.getImgHeight()
            && this.xPos + this.img.width > gameObject.getXPos()
            && this.xPos < gameObject.getXPos() + gameObject.getImgWidth()
    }

    /**
     * Loads an image file into the DOM. The image is stored in the img
     * attribute of this class before it is loaded. This means that this.img
     * always holds an HTMLImageElement, but it might be empty
     *
     * @param {string} source - the name of the image file to load
     */
    private loadImage(source: string) {
        this.img = new Image();
        // Now, set the src to start loading the image
        this.img.src = source;
    }

    /**
     * Set the X position
     * @param imgUrl
     */
    // public setImgUrl(imgUrl: string) {
    //     this.img = this.loadImage(imgUrl);
    // }

    /**
     * Set the X position
     * @param xPos
     */
    public setXPos(xPos: number) {
        this.xPos = xPos;
    }

    /**
     * Get the X position
     */
    public getXPos(): number {
        return this.xPos;
    }

    /**
     * Set the Y position
     * @param yPos
     */
    public setYPos(yPos: number) {
        this.yPos = yPos;
    }

    /**
     * Get the Y position
     */
    public getYPos(): number {
        return this.yPos;
    }

    /**
     * Get the X velocity
     */
    public getXVel(): number {
        return this.xVel;
    }

    /**
     * Get the Y velocity
     */
    public getYVel(): number {
        return this.yVel;
    }

    /**
     * Get the image width
     */
    public getImgWidth(): number {
        return this.img.width;
    }

    /**
     * Get the image height
     */
    public getImgHeight(): number {
        return this.img.height;
    }

    /**
     * Set the X velocity
     * @param xVel
     */
    public setXVel(xVel: number) {
        this.xVel = xVel;
    }

    /**
     * Set the Y velocity
     * @param yVel
     */
    public setYVel(yVel: number) {
        this.yVel = yVel;
    }

    /**
     * Set the Game object health
     * @param health
     */
    public setHealth(health: number) {
        this.health = health;
    }

    /**
     * Get the Game object health
     */
    public getHealth(): number {
        return this.health;
    }

    /**
 * Get the Game object id
 */
    public getId(): number {
        return this.gameobjectId;
    }
}