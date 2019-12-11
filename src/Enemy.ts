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
    public constructor(image: string, xPos: number, yPos: number, xVel: number, yVel: number, health: number) {
        super(image, xPos, yPos, xVel, yVel, health)
    }
}