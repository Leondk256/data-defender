///<reference path="GameObject.ts"/>
class Enemy extends GameObject {
    /**
     * Constructor
     * @param image HTMLImageElement
     * @param xPos number
     * @param yPos number
     * @param xVel number
     * @param yVel number
     */
    protected constructor(image: string, xPos: number, yPos: number, xVel: number, yVel: number) {
        super(image, xPos, yPos, xVel, yVel)
    }
}