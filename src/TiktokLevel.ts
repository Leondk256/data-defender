// tslint:disable member-ordering
///<reference path="Gamescreen.ts"/>

class TiktokLevel extends GameScreen {
    private gameTicker: number;
    private projectiles: Projectile[];
    private cooldown: number;
    private facebookPlanet: GameObject;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener, ship: Ship, playerProjectiles: Projectile) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
        this.gameTicker = 0;
        this.projectiles = [];
        this.cooldown = 0;
    }

    public draw() {
        // Keep track of the frames
        this.gameTicker++;
        if (this.cooldown > 0) {
            this.cooldown--;
        }

        // Draw stars
        this.drawStars();

        // Draw lives
        this.drawLives();

        // // If the Ship collides, remove one live
        // if (this.ship.isCollidingWithProjectile(this.facebookBoss) === true) {
        //     this.ship.setHealth(this.ship.getHealth() - 1);
        // }

        // If the Ship doesn't have any lives left, head to game over screen
        if (this.ship.getHealth() <= 0) {
            this.ship.setHealth(3);
            Game.gameOverScreen = true;
        }

        // // If the boss has no health, do not draw, move or shoot it
        // if (this.facebookBoss.getHealth() <= 0) {
        //     // Set his soul outside of the canvas
        //     this.facebookBoss.setYPos(-1000);

        //     // Draw black hole
        //     this.blackhole.draw(this.ctx);

        //     // Move the black hole
        //     this.blackhole.setYPos(this.canvas.height / 100 * 90);

        //     // Check if the Ship is colliding with the blackhole once it's visible
        //     Game.blackholescreen = this.ship.isCollidingWithProjectile(this.blackhole) === true;

        // } else {
        //     // Draw the Facebook boss
        //     this.facebookBoss.draw(this.ctx);

        //     // Move the Facebook boss
        //     this.facebookBoss.move(this.canvas);
        // }

        // this.writeTextToCanvas(
        //     `Health: ${this.facebookBoss.getHealth()}`,
        //     30,
        //     this.facebookBoss.getXPos(),
        //     this.facebookBoss.getYPos() - 100,
        //     "center",
        // );

        this.writeTextToCanvas(
            `${Game.globalPlayerName}`,
            30,
            this.ship.getXPos(),
            this.ship.getYPos() - 50,
            "center",
        );

        // if (this.gameTicker % 50 === 0) {
        //     this.projectiles.push(new Projectile(
        //         Game.currentId,
        //         "./assets/img/gameobject/projectiles/hostile/thumbsdownr.png",
        //         this.facebookBoss.getXPos() - 100,
        //         this.facebookBoss.getYPos(),
        //         5,
        //         0,
        //         1
        //     ));
        //     Game.currentId++;
        // }

        // // Move and draw all the game entities
        // this.projectiles.forEach((projectile) => {
        //     if (projectile.inBounds(this.canvas)) {
        //         projectile.draw(this.ctx);
        //         projectile.shootProjectileRightToLeft(this.canvas);
        //         if (this.ship.isCollidingWithProjectile(projectile)) {
        //             this.ship.setHealth(this.ship.getHealth() - 1);
        //             for (let i = this.projectiles.length - 1; i >= 0; --i) {
        //                 this.projectiles = this.removeProjectilesWithId(this.projectiles, projectile.getId());
        //             }
        //         }
        //     }
        //     else {
        //         for (let i = this.projectiles.length - 1; i >= 0; --i) {
        //             this.projectiles = this.removeProjectilesWithId(this.projectiles, projectile.getId());
        //         }
        //     }
        // });

        // Move the Ship
        this.ship.move(this.canvas);

        // Draw the Ship
        this.ship.draw(this.ctx);

        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.cooldown === 0) {
            this.playerProjectiles.push(new Projectile(
                Game.currentId,
                "./assets/img/gameobject/projectiles/friendly/lvl1r.png",
                this.ship.getXPos() + 90,
                this.ship.getYPos(),
                10,
                0,
                1
            ));
            this.cooldown = 15;
            Game.currentId++;
        }

        // Move and draw all the game entities
        this.playerProjectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileLeftToRight(this.canvas);

                // // Check if the laser shot hits the facebook boss
                // if (projectile.isCollidingWithProjectile(this.facebookBoss)) {
                //     // Subtract one health when beamed by laser
                //     this.facebookBoss.setHealth(this.facebookBoss.getHealth() - 1);
                //     this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                // }
            }
        })
    }
}