// tslint:disable member-ordering
///<reference path="Gamescreen.ts"/>

class LevelScreen extends GameScreen {

    private keyboardListener: KeyboardListener;
    private lives: number;
    private score: number;
    private life: HTMLImageElement;
    private ship: Ship;
    private startScreen: StartScreen;

    private facebookBoss: FacebookBoss;
    private gameTicker: number;
    private projectiles: Projectile[];
    private playerProjectiles: Projectile[];
    private blackhole: GameObject;
    private forceField: GameObject;
    private game: Game;
    private cooldown: number;
    // private ship: Ship;
    // private keyboardListener: KeyboardListener;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener) {
        super(canvas, ctx);
        this.lives = 3;
        this.score = 400;
        this.gameTicker = 0;
        this.keyboardListener = keyboardListener;
        this.projectiles = [];
        this.playerProjectiles = [];
        this.cooldown = 0;

        // this.life = new Image();
        // this.life.src = "./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png";

        this.facebookBoss = new FacebookBoss(
            Game.currentId,
            "./assets/img/gameobject/enemies/facebookbossr.png",
            this.canvas.width / 100 * 80,
            this.canvas.height / 100 * 50,
            0,
            10,
            3,
        );

        Game.currentId++;

        this.blackhole = new GameObject(
            Game.currentId,
            "./assets/img/blackhole.png",
            this.canvas.width / 100 * 95,
            this.canvas.height / 100 * 90,
            0,
            0,
            1
        );

        Game.currentId++;

        // Create a ship
        this.ship = new Ship(
            Game.currentId,
            `./assets/img/ship${Game.selectedShip}.png`,
            this.canvas.width / 6,
            this.canvas.height / 2,
            5,
            5,
            this.keyboardListener,
            3,
        );

        Game.currentId++;

        this.startScreen = new StartScreen(
            this.canvas,
            this.ctx,
            0,
        );
    }

    public draw() {
        this.gameTicker++;
        if (this.cooldown > 0) {
            this.cooldown--;
        }

        // 1. load life images
        // this.writeLifeImagesToLevelScreen();

        // 2. draw current score
        // this.writeTextToCanvas(
        //     `Your score: ${this.score}`,
        //     20,
        //     this.canvas.width - 100,
        //     30,
        //     "right",
        // );

        // If the Ship collides, remove one live
        if (this.ship.isCollidingWithProjectile(this.facebookBoss) === true) {
            this.lives--;
        }

        // If the Ship doesn't have any lives left, head to game over screen
        Game.gameOverScreen = this.lives <= 0;

        // Check if the Ship is colliding with the blackhole once it's visible
        Game.blackholescreen = this.ship.isCollidingWithProjectile(this.blackhole) === true;

        // If the boss has no health, do not draw, move or shoot it
        if (this.facebookBoss.getHealth() <= 0) {
            // Set his soul outside of the canvas
            this.facebookBoss.setYPos(-1000);

            // Draw blackhole
            this.blackhole.draw(this.ctx);

        } else {
            // Draw the Facebook boss
            this.facebookBoss.draw(this.ctx);

            // Move the Facebook boss
            this.facebookBoss.move(this.canvas);
        }

        this.writeTextToCanvas(
            `Health: ${this.facebookBoss.getHealth()}`,
            30,
            this.facebookBoss.getXPos(),
            this.facebookBoss.getYPos() - 100,
            "center",
        );

        this.writeTextToCanvas(
            `${Game.globalPlayerName}`,
            30,
            this.ship.getXPos(),
            this.ship.getYPos() - 50,
            "center",
        );

        if (this.gameTicker % 50 === 0) {
            this.projectiles.push(new Projectile(
                Game.currentId,
                "./assets/img/gameobject/projectiles/hostile/thumbsdownr.png",
                this.facebookBoss.getXPos() - 100,
                this.facebookBoss.getYPos(),
                5,
                0,
                1
            ));
            Game.currentId++;
        }

        // Move and draw all the game entities
        this.projectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileRightToLeft(this.canvas);
                if (this.ship.isCollidingWithProjectile(projectile)) {
                    this.lives--;
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
                "./assets/img/gameobject/projectiles/friendly/lvl1r.png",
                this.ship.getXPos() + 90,
                this.ship.getYPos(),
                5,
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

                // Check if the laser shot hits the facebook boss
                if (projectile.isCollidingWithProjectile(this.facebookBoss)) {
                    // Subtract one health when beamed by laser
                    this.facebookBoss.setHealth(this.facebookBoss.getHealth() - 1);
                    this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                }
            }
        })
    }

    // /**
    //  * Uses the loaded life image to remaining lives of the player on the rop
    //  * left of the screen.
    //  *
    //  * @param {HTMLImageElement} img the loaded image object
    //  */
    // private writeLifeImagesToLevelScreen() {
    //     if (this.life.naturalWidth > 0) {
    //         let x = 10;
    //         const y = this.life.height - 10;
    //         // Start a loop for each life in lives
    //         for (let life = 0; life < this.lives; life++) {
    //             // Draw the image at the curren x and y coordinates
    //             this.ctx.drawImage(this.life, x, y);
    //             // Increase the x-coordinate for the next image to draw
    //             x += this.life.width + 10;
    //         }
    //     }
    // }

    /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    /**
     * Remove enemy projectiles with specific id
     * @param projectiles 
     * @param objectId 
     */
    private removeProjectilesWithId(projectiles: Projectile[], objectId: number): Projectile[] {
        return projectiles.filter(i => i['gameobjectId'] !== objectId);
    }

    /**
     * Writes text to the canvas
     * @param {string} text - Text to write
     * @param {number} fontSize - Font size in pixels
     * @param {number} xCoordinate - Horizontal coordinate in pixels
     * @param {number} yCoordinate - Vertical coordinate in pixels
     * @param {string} alignment - Where to align the text
     * @param {string} color - The color of the text
     */
    public writeTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
    ) {
        this.ctx.font = `${fontSize}px Spacecomics`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}