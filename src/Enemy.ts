///<reference path="GameObject.ts"/>
class Enemy extends GameObject {
    /**
     * Constructor
     * @param xPos number
     * @param yPos number
     * @param xVel number
     * @param yVel number
     * @param image HTMLImageElement
     */
    protected constructor(xPos: number, yPos: number, xVel: number, yVel: number, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
        super(xPos, yPos, xVel, yVel, ctx, image)
    }
}