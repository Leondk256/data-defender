/// <reference path="GameScreen.ts" />
class BlackholeScreen extends GameScreen {
    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener, ship: Ship, playerProjectiles: Projectile) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);

        this.playerProjectiles = [];
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
    }

    public draw() {
        this.writeTextToCanvas(
            "Zwart gat",
            50,
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 15
        );

        // this.writeTextToCanvas(
        //     "Bedankt voor het spelen!",
        //     50,
        //     (this.canvas.width / 100) * 50,
        //     (this.canvas.height / 100) * 15
        // );

        // this.writeTextToCanvas(
        //     "Wij gaan verder met het ontwikkelen van het spel.",
        //     50,
        //     (this.canvas.width / 100) * 50,
        //     (this.canvas.height / 100) * 20
        // );

        this.writeTextToCanvas(
            "Schiet op het juiste antwoord",
            30,
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 25
        );

        this.writeTextToCanvas(
            `${Game.globalPlayerName}`,
            30,
            this.ship.getXPos(),
            this.ship.getYPos() - 50,
            "center",
        );

        // Move the Ship
        this.ship.move(this.canvas);

        // Draw the Ship
        this.ship.draw(this.ctx);

        // if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.cooldown === 0) {
        //     this.playerProjectiles.push(new Projectile(
        //         Game.currentId,
        //         "./assets/img/gameobject/projectiles/friendly/lvl1r.png",
        //         this.ship.getXPos() + 90,
        //         this.ship.getYPos(),
        //         5,
        //         0,
        //         1
        //     ));
        //     this.cooldown = 15;
        //     Game.currentId++;
        // }

        // Move and draw all the game entities
        // this.playerProjectiles.forEach((projectile) => {
        //     if (projectile.inBounds(this.canvas)) {
        //         projectile.draw(this.ctx);
        //         projectile.shootProjectileLeftToRight(this.canvas);

        //         // // Check if the laser shot hits the facebook boss
        //         // if (projectile.isCollidingWithProjectile(this.facebookBoss)) {
        //         //     // Subtract one health when beamed by laser
        //         //     this.facebookBoss.setHealth(this.facebookBoss.getHealth() - 1);
        //         //     this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
        //         // }
        //     }
        // })
    }
}