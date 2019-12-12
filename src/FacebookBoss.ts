///<reference path="Projectile.ts"/>
class FacebookBoss extends Projectile {
    private projectile: Projectile;
    private projectileXPos: number;
    private projectileYPos: number;

    /**
     * Constructor
     * @param image 
     * @param xPos 
     * @param yPos 
     * @param xVel 
     * @param yVel 
     * @param health
     */
    public constructor(image: string, xPos: number, yPos: number, xVel: number, yVel: number, health: number) {
        super(image, xPos, yPos, xVel, yVel, health);
        this.projectileXPos = this.xPos;
        this.projectileYPos = this.yPos;
    }

    public shoot(ctx: CanvasRenderingContext2D) {
        this.projectile = new Projectile(
            "./assets/images/beam.png",
            this.projectileXPos,
            this.projectileYPos,
            20,
            0,
            1
        );
        this.projectile.draw(ctx);
        this.projectileXPos -= this.projectile.getXVel();
    }
}