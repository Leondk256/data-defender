///<reference path="Projectile.ts"/>
class YoutubeBoss extends Projectile {
    /**
     * Constructor
     * @param image
     * @param xPos
     * @param yPos
     * @param xVel
     * @param yVel
     * @param health
     * @param angle
     * @param moveAngle
     */
    public constructor(id: number, image: string, xPos: number, yPos: number, xVel: number, yVel: number, health: number, angle: number, moveAngle: number) {
        super(id, image, xPos, yPos, xVel, yVel, health, angle, moveAngle);
    }
}