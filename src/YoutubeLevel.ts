///<reference path="Gamescreen.ts"/>
class YoutubeLevel extends GameScreen {
    private youtubeBoss: YoutubeBoss;
    private gameTicker: number;
    private projectiles: Projectile[];
    private projectiles2: Projectile[];
    private projectiles3: Projectile[];
    private projectiles4: Projectile[];
    private cooldown: number;
    private youtubeLevelObjects: GameObject[];

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener, ship: Ship, playerProjectiles: Projectile) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
        this.gameTicker = 0;
        this.projectiles = [];
        this.projectiles2 = [];
        this.projectiles3 = [];
        this.projectiles4 = [];
        this.cooldown = 0;

        // Create empty objects array
        this.youtubeLevelObjects = [];

        this.youtubeBoss = new YoutubeBoss(
            Game.currentId,
            "./assets/img/gameobject/enemies/youtubeboss1.png",
            this.canvas.width / 100 * 80,
            this.canvas.height / 100 * 50,
            6,
            11,
            40,
            1,
            40,
        );
        Game.currentId++;

        this.blackhole = new GameObject(
            Game.currentId,
            "./assets/img/environment/blackhole.png",
            this.canvas.width / 100 * 95,
            -1000,
            0,
            0,
            1,
            1,
            1,
        );

        Game.currentId++;

        // Add Youtubeplanet
        this.createGameObject("./assets/img/environment/youtubeplaneet.png", 30, 85, this.youtubeLevelObjects);
        // Another one
        this.createGameObject("./assets/img/environment/youtubeplaneet.png", 70, 30, this.youtubeLevelObjects);

        // Add heart
        this.createGameObject("./assets/img/environment/heart.png", 25, 30, this.youtubeLevelObjects);
        // Add heart
        this.createGameObject("./assets/img/environment/heart.png", 65, 80, this.youtubeLevelObjects);
    }

    public draw() {
        // Keep track of the frames
        this.gameTicker++;

        // TODO comment
        if (this.cooldown > 0) {
            this.cooldown--;
        }

        // Draw stars
        this.drawStars();

        // Draw background design
        this.drawAllObjects(this.youtubeLevelObjects);

        // Set the standard text color to white
        let color = "black";

        // Set the text color to red if the player only has 1 live left
        if (this.ship.getHealth() < 2) {
            color = "red";
        }

        Game.blackholescreen = this.ship.isCollidingWithProjectile(this.blackhole) === true;

        // Write the lives left to the screen
        this.writeTextToCanvas(
            `Levens: ${this.ship.getHealth()}`,
            30,
            90,
            60,
            "center",
            color,
        );

        // Show the player name above the ship
        this.writeTextToCanvas(
            `${Game.globalPlayerName}`,
            30,
            this.ship.getXPos(),
            this.ship.getYPos() - 50,
            "center",
        );

        // If the Ship doesn't have any lives left, head to game over screen
        if (this.ship.getHealth() <= 0) {
            this.ship.setHealth(3);
            Game.gameOverScreen = true;
        }

        if (this.gameTicker % 50 === 0) {
            this.projectiles.push(new Projectile(
                Game.currentId,
                "./assets/img/gameobject/projectiles/hostile/youtube_boss_projectile.png",
                this.youtubeBoss.getXPos() - 100,
                this.youtubeBoss.getYPos(),
                5,
                0,
                1,
                1,
                1,
            ));
            Game.currentId++;
        }

        if (this.gameTicker % 50 === 0) {
            this.projectiles2.push(new Projectile(
                Game.currentId,
                "./assets/img/gameobject/projectiles/hostile/youtube_boss_projectile.png",
                this.youtubeBoss.getXPos() + 100,
                this.youtubeBoss.getYPos(),
                5,
                0,
                1,
                1,
                1,
            ));
            Game.currentId++;
        }

        if (this.gameTicker % 100 === 0) {
            this.projectiles3.push(new Projectile(
                Game.currentId,
                "./assets/img/gameobject/projectiles/hostile/youtube_boss_projectile.png",
                this.youtubeBoss.getXPos(),
                this.youtubeBoss.getYPos() + 100,
                0,
                5,
                1,
                1,
                1,
            ));
            Game.currentId++;
        }

        if (this.gameTicker % 100 === 0) {
            this.projectiles4.push(new Projectile(
                Game.currentId,
                "./assets/img/gameobject/projectiles/hostile/youtube_boss_projectile.png",
                this.youtubeBoss.getXPos(),
                this.youtubeBoss.getYPos() - 100,
                0,
                5,
                1,
                1,
                1,
            ));
            Game.currentId++;
        }

        // Move the Ship
        this.ship.move(this.canvas);

        // Draw the Ship
        this.ship.draw(this.ctx);

        // If the Ship collides, remove one live
        if (this.ship.isCollidingWithProjectile(this.youtubeBoss) === true) {
            this.ship.setHealth(this.ship.getHealth() - 1);
        }

        // If the Ship doesn't have any lives left, head to game over screen
        if (this.ship.getHealth() <= 0) {
            this.ship.setHealth(3);
            Game.gameOverScreen = true;
        }

        // If the boss has no health, do not draw, move or shoot it
        if (this.youtubeBoss.getHealth() <= 0) {
            this.youtubeLevelObjects.push(new GameObject(
                Game.currentId,
                "./assets/img/gameobject/projectiles/explosion2.png",
                this.youtubeBoss.getXPos(),
                this.youtubeBoss.getYPos(),
                0,
                10,
                1,
                0,
                0
            ));
            // Set his soul outside of the canvas
            this.youtubeBoss.setYPos(-1000);

            // Draw black hole
            this.blackhole.draw(this.ctx);

            // Move the black hole
            this.blackhole.setYPos(this.canvas.height / 100 * 90);

            // Check if the Ship is colliding with the blackhole once it's visible
            if (this.ship.isCollidingWithProjectile(this.blackhole) === true) {
                Game.blackholescreen = true;
                Game.blackholescreenIntoYoutube = false;
            }

        } else {
            // Draw the Youtube boss
            this.youtubeBoss.draw(this.ctx);

            // Move the Youtube boss
            this.youtubeBoss.move(this.canvas);
        }

        // Write the lives above the Youtube boss
        this.writeTextToCanvas(
            `Levens: ${this.youtubeBoss.getHealth()}`,
            30,
            this.youtubeBoss.getXPos(),
            this.youtubeBoss.getYPos() - 100,
            "center",
        );

        // Move and draw all the game entities
        this.projectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileRightToLeft(this.canvas);
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

        // Move and draw all the game entities
        this.projectiles2.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileLeftToRight(this.canvas);
                if (this.ship.isCollidingWithProjectile(projectile)) {
                    this.ship.setHealth(this.ship.getHealth() - 1);
                    for (let i = this.projectiles2.length - 1; i >= 0; --i) {
                        this.projectiles2 = this.removeProjectilesWithId(this.projectiles2, projectile.getId());
                    }
                }
            }
            else {
                for (let i = this.projectiles2.length - 1; i >= 0; --i) {
                    this.projectiles2 = this.removeProjectilesWithId(this.projectiles2, projectile.getId());
                }
            }
        });

        // Move and draw all the game entities
        this.projectiles3.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileTopToBottom(this.canvas);
                if (this.ship.isCollidingWithProjectile(projectile)) {
                    this.ship.setHealth(this.ship.getHealth() - 1);
                    for (let i = this.projectiles3.length - 1; i >= 0; --i) {
                        this.projectiles3 = this.removeProjectilesWithId(this.projectiles3, projectile.getId());
                    }
                }
            }
            else {
                for (let i = this.projectiles3.length - 1; i >= 0; --i) {
                    this.projectiles3 = this.removeProjectilesWithId(this.projectiles3, projectile.getId());
                }
            }
        });

        // Move and draw all the game entities
        this.projectiles4.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileBottomToTop(this.canvas);
                if (this.ship.isCollidingWithProjectile(projectile)) {
                    this.ship.setHealth(this.ship.getHealth() - 1);
                    for (let i = this.projectiles4.length - 1; i >= 0; --i) {
                        this.projectiles4 = this.removeProjectilesWithId(this.projectiles4, projectile.getId());
                    }
                }
            }
            else {
                for (let i = this.projectiles4.length - 1; i >= 0; --i) {
                    this.projectiles4 = this.removeProjectilesWithId(this.projectiles4, projectile.getId());
                }
            }
        });

        // TODO: comment / refactor function
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.cooldown === 0) {
            this.playerProjectiles.push(new Projectile(
                Game.currentId,
                this.friendlyProjectileArray[2],
                this.ship.getXPos() + 90,
                this.ship.getYPos(),
                10,
                0,
                1,
                1,
                1,
            ));
            this.cooldown = 15;
            Game.currentId++;
        }

        // TODO: refactor function
        // Move and draw all the game entities
        this.playerProjectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileLeftToRight(this.canvas);

                // Check if the laser shot hits the facebook boss
                if (projectile.isCollidingWithProjectile(this.youtubeBoss)) {
                    // Subtract one health when beamed by laser
                    this.youtubeBoss.setHealth(this.youtubeBoss.getHealth() - 1);
                    this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                }
            }
        })
    }
}