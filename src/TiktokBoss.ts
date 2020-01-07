///<reference path="Projectile.ts"/>
class TiktokBoss extends Projectile {
    /**
     * Constructor
     * @param image
     * @param xPos
     * @param yPos
     * @param xVel
     * @param yVel
     * @param health
     */
    public constructor(id: number, image: string, xPos: number, yPos: number, xVel: number, yVel: number, health: number) {
        super(id, image, xPos, yPos, xVel, yVel, health);
    }
}