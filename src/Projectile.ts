///<reference path="GameObject.ts"/>
class Projectile extends GameObject{
    protected image: string;
    protected xVel: number;
    protected yVel: number;
    protected xPos: number;
    protected yPos: number;

    /**
     * Construct a new moving projectile.
     * @param image
     * @param xPos X coordinate of its starting position
     * @param yPos y coordinate of its starting position
     * @param xVel x part of the velocity vector
     * @param yVel y part of the velocity vector
     */
    public constructor(
        image: string,
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
    ) {
        super(image, xPos, yPos, xVel, yVel);
    }
}