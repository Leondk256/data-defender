// tslint:disable member-ordering
///<reference path="Gamescreen.ts"/>

class LevelScreen extends GameScreen {

    private keyboardListener: KeyboardListener;
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
    private facebookPlanet: GameObject;
    // private ship: Ship;
    // private keyboardListener: KeyboardListener;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener) {
        super(canvas, ctx);
        this.score = 400;
        this.gameTicker = 0;
        this.keyboardListener = keyboardListener;
        this.projectiles = [];
        this.playerProjectiles = [];
        this.cooldown = 0;

        this.facebookBoss = new FacebookBoss(
            Game.currentId,
            "./assets/img/gameobject/enemies/facebookbossr.png",
            this.canvas.width / 100 * 80,
            this.canvas.height / 100 * 50,
            0,
            10,
            50,
        );

        Game.currentId++;

        this.facebookPlanet = new GameObject(
            Game.currentId,
            "./assets/img/environment/facebookplaneet1.png",
            (this.canvas.width / 100) * 10,
            (this.canvas.height / 100) * 75,
            0,
            0,
            0
        );

        Game.currentId++;

        this.blackhole = new GameObject(
            Game.currentId,
            "./assets/img/environment/blackhole.png",
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
            6,
            6,
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
        // Keep track of the frames
        this.gameTicker++;
        if (this.cooldown > 0) {
            this.cooldown--;
        }

        // Draw facebookplanet
        this.facebookPlanet.draw(this.ctx);

        // Set the standard text color to white
        let color = "black";

        // Set the text color to red if the player only has 1 live left
        if (this.ship.getHealth() < 2) {
            color = "red";
        }

        // Write the lives left to the screen
        this.writeTextToCanvas(
            `Levens: ${this.ship.getHealth()}`,
            30,
            90,
            60,
            "center",
            color,
        );

        // If the Ship collides, remove one live
        if (this.ship.isCollidingWithProjectile(this.facebookBoss) === true) {
            this.ship.setHealth(this.ship.getHealth() - 1);
        }

        // If the Ship doesn't have any lives left, head to game over screen
        Game.gameOverScreen = this.ship.getHealth() <= 0;

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
        color: string = "black",
    ) {
        this.ctx.font = `${fontSize}px Spacecomics`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}