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
     */
    public constructor(image: string, xPos: number, yPos: number, xVel: number, yVel: number) {
        super(image, xPos, yPos, xVel, yVel);
        this.projectileXPos = this.xPos - 350;
        this.projectileYPos = this.yPos;
    }

    public shoot(ctx: CanvasRenderingContext2D) {
        for (let index = 0; index < 5; index++) {
            console.log(this.projectileYPos);
            this.projectile = new Projectile(
                "./assets/images/beam.png",
                this.projectileXPos,
                this.projectileYPos,
                0,
                0,
            );
            this.projectile.draw(ctx);
            this.projectileXPos -= 5;
        }
    }
}