// tslint:disable member-ordering
///<reference path="Gamescreen.ts"/>

class TiktokLevel extends GameScreen {
    private gameTicker: number;
    private projectiles: Projectile[];
    private cooldown: number;
    private gameObjects: GameObject[];
    private tiktokBoss: TiktokBoss;
    private tiktokObjects: GameObject[];

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener, ship: Ship, playerProjectiles: Projectile) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
        this.gameTicker = 0;
        this.projectiles = [];
        this.cooldown = 0;
        this.gameObjects = [];

        this.tiktokBoss = new TiktokBoss(
            Game.currentId,
            "./assets/img/gameobject/enemies/tiktokboss1.png",
            this.canvas.width / 100 * 90,
            this.canvas.height / 100 * 50,
            6,
            6,
            40,
            0,
            40
        );
        // Create empty tiktokobject array
        this.tiktokObjects = [];

        // Create tiktokplanets objects
        this.createGameObject("./assets/img/environment/tiktokplaneet.png", 30, 40, this.tiktokObjects)
        this.createGameObject("./assets/img/environment/tiktokplaneet.png", 70, 60, this.tiktokObjects)

        // Create Heart objects
        this.createGameObject("./assets/img/environment/Heart.png", 50, 70, this.tiktokObjects)
        this.createGameObject("./assets/img/environment/Heart.png", 60, 15, this.tiktokObjects)
    }

    public draw() {
        // Keep track of the frames
        this.gameTicker++;

        if (this.cooldown > 0) {
            this.cooldown--;
        }

        // Set the standard text color to white
        let color = "black";

        // Set the text color to red if the player only has 1 live left
        if (this.ship.getHealth() < 2) {
            color = "red";
        }
        // Draw background design
        this.drawAllObjects(this.tiktokObjects)

        // Draw stars
        this.drawStars();

        // Draw lives
        this.drawLives();

        // If the Ship collides, remove one live
        if (this.ship.isCollidingWithProjectile(this.tiktokBoss) === true) {
            this.ship.setHealth(this.ship.getHealth() - 1);
        }

        // If the Ship doesn't have any lives left, head to game over screen
        if (this.ship.getHealth() <= 0) {
            this.ship.setHealth(3);
            Game.gameOverScreen = true;
        }

        // If the boss has no health, do not draw, move or shoot it
        if (this.tiktokBoss.getHealth() <= 0) {
            this.tiktokObjects.push(new GameObject(
                Game.currentId,
                "./assets/img/gameobject/projectiles/explosion2.png",
                this.tiktokBoss.getXPos(),
                this.tiktokBoss.getYPos(),
                0,
                10,
                1,
                0,
                0
            ));

            // Set his soul outside of the canvas
            this.tiktokBoss.setYPos(-1000);

            // Draw black hole
            this.blackhole.draw(this.ctx);

            // Move the black hole
            this.blackhole.setYPos(this.canvas.height / 100 * 90);

            // Check if the Ship is colliding with the blackhole once it's visible
             if (this.ship.isCollidingWithProjectile(this.blackhole) === true) {
                Game.blackholescreen = true
                Game.blackholescreenIntoTiktok = false;
                Game.blackholescreenIntoYoutube = false;
            }

        } else {
            // Draw the Facebook boss
            this.tiktokBoss.draw(this.ctx);

            // Move the Facebook boss
            this.tiktokBoss.tiktokBossMove(this.canvas);
        }

        this.writeTextToCanvas(
            `Levens: ${this.tiktokBoss.getHealth()}`,
            30,
            this.tiktokBoss.getXPos(),
            this.tiktokBoss.getYPos() - 100,
            "center",
        );

        this.writeTextToCanvas(
            `${Game.globalPlayerName}`,
            30,
            this.ship.getXPos(),
            this.ship.getYPos() - 50,
            "center",
        );

        // add projectiles to the projectile array
        if (this.gameTicker % 45 === 0) {
            this.projectiles.push(new Projectile(
                Game.currentId,
                "./assets/img/gameobject/projectiles/hostile/music_note.png",
                this.tiktokBoss.getXPos() - 130,
                this.tiktokBoss.getYPos(),
                5,
                15,
                1,
                1,
                1
            ));
            Game.currentId++;
        }

        // Move and draw all the game entities
        this.projectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileRightToLeft(this.canvas);
                projectile.moveInCircles(this.canvas);

                // check if projectile collides with ship
                if (this.ship.isCollidingWithProjectile(projectile)) {
                    this.ship.setHealth(this.ship.getHealth() - 1);
                    for (let i = this.projectiles.length - 1; i >= 0; --i) {
                        this.projectiles = this.removeProjectilesWithId(this.projectiles, projectile.getId());
                    }
                }
            }
            else {
                for (let i = this.projectiles.length - 1; i >= 0; --i) {
                    this.projectiles = this.removeProjectilesWithId(this.projectiles, projectile.getId());
                }
            }
        });

        // Move the Ship
        this.ship.move(this.canvas);

        // Draw the Ship
        this.ship.draw(this.ctx);

        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.cooldown === 0) {
            this.playerProjectiles.push(new Projectile(
                Game.currentId,
                this.friendlyProjectileArray[1],
                this.ship.getXPos() + 90,
                this.ship.getYPos(),
                10,
                0,
                1,
                0,
                0
            ));
            this.cooldown = 15;
            Game.currentId++;
        }

        // Draw background design
        this.gameObjects.forEach(element => {
            element.draw(this.ctx)
        });

        this.tiktokBoss.draw(this.ctx);

        // Move and draw all the game entities
        this.playerProjectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileLeftToRight(this.canvas);

                // Check if the laser shot hits the facebook boss
                if (projectile.isCollidingWithProjectile(this.tiktokBoss)) {
                    // Subtract one health when beamed by laser
                    this.tiktokBoss.setHealth(this.tiktokBoss.getHealth() - 1);
                    this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                }
            }
        })
    }
}