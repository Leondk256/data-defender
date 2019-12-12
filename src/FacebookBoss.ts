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
        this.health = 100;
    }

    public shoot(ctx: CanvasRenderingContext2D) {
        this.projectile = new Projectile(
            "./assets/img/beam2.png",
            this.projectileXPos,
            this.projectileYPos,
            0,
            0,
            5
        );

        // console.log(this.projectile.getXPos());
        // if (this.projectile.getXPos() < 500) {
        //     console.log('g');
        // }

        this.projectile.draw(ctx);
        this.projectileXPos -= 4;
    }
}