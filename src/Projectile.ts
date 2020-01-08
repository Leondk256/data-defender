///<reference path="GameObject.ts"/>
class Projectile extends GameObject{
    /**
     * Construct a new moving projectile.
     * @param projectileId
     * @param image
     * @param xPos X coordinate of its starting position
     * @param yPos y coordinate of its starting position
     * @param xVel x part of the velocity vector
     * @param yVel y part of the velocity vector
     * @param health
     * @param angle
     * @param moveAngle
     */
    public constructor(
        projectileId: number,
        image: string,
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        health: number,
        angle: number,
        moveAngle: number
    ) {
        super(projectileId, image, xPos, yPos, xVel, yVel, health, angle, moveAngle);
    }
}