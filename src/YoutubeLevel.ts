///<reference path="Gamescreen.ts"/>
class YoutubeLevel extends GameScreen {
    private youtubeBoss: YoutubeBoss;
    private gameTicker: number;
    private projectiles: Projectile[];
    private cooldown: number;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener, ship: Ship, playerProjectiles: Projectile) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
        this.gameTicker = 0;
        this.projectiles = [];
        this.cooldown = 0;

        this.youtubeBoss = new YoutubeBoss(
            Game.currentId,
            "./assets/img/gameobject/enemies/facebookbossr.png",
            this.canvas.width / 100 * 80,
            this.canvas.height / 100 * 50,
            0,
            10,
            1,
            0,
            0
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
            0,
            0
        );

        Game.currentId++;
    }

    public draw() {
        // Keep track of the frames
        this.gameTicker++;

        // TODO comment
        if (this.cooldown > 0) {
            this.cooldown--;
        }

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

        // Move the Ship
        this.ship.move(this.canvas);

        // Draw the Ship
        this.ship.draw(this.ctx);

        // If the Ship collides, remove one live
        if (this.ship.isCollidingWithProjectile(this.youtubeBoss) === true) {
            this.ship.setHealth(this.ship.getHealth() - 1);
        }

        // If the boss has no health, do not draw, move or shoot it
        if (this.youtubeBoss.getHealth() <= 0) {
            // Set his soul outside of the canvas
            this.youtubeBoss.setYPos(-1000);

            // Draw black hole
            this.blackhole.draw(this.ctx);

            // Move the black hole
            this.blackhole.setYPos(this.canvas.height / 100 * 90);

            // Check if the Ship is colliding with the blackhole once it's visible
            Game.blackholescreen = this.ship.isCollidingWithProjectile(this.blackhole) === true;

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

        // TODO: comment / refactor function
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.cooldown === 0) {
            this.playerProjectiles.push(new Projectile(
                Game.currentId,
                "./assets/img/gameobject/projectiles/friendly/lvl1r.png",
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