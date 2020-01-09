/// <reference path="GameScreen.ts" />
class BlackholeScreen extends GameScreen {
    private cooldown: number;
    private blackholeQuestions: [string, string, string];
    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener, ship: Ship, playerProjectiles: Projectile) {
        super(canvas, ctx, keyboardListener, ship, playerProjectiles);
        this.cooldown = 0;
        Game.blackholeScreenCounter++;
        this.blackholeQuestions = [
            "Is het slim om met wie dan ook online gevoelige gegevens te delen?",
            "Je krijgt een vriendschapsverzoek van een vreemde, is het slim om deze te accepteren?",
            "Iemand vraagt je een foto te sturen om je identiteit te bevestigen,\n is het slim om deze actie uit te voeren?"
        ]
    }

    public draw() {
        this.blackhole.draw(this.ctx);

        if (this.cooldown > 0) {
            this.cooldown--;
        }

        // Draw stars
        this.drawStars();

        // Draw yes
        this.yes.draw(this.ctx);
        // Draw no
        this.no.draw(this.ctx);

        // Draw lives
        this.drawLives();

        this.writeTextToCanvas(
            "Zwart gat",
            50,
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 15
        );

        this.writeTextToCanvas(
            "Schiet op het juiste antwoord",
            30,
            (this.canvas.width / 100) * 50,
            (this.canvas.height / 100) * 25
        );

        this.writeMultipleTextLinesToCanvas(
            30,
            this.ctx,
            this.blackholeQuestions[Game.blackholeScreenCounter],
            50,
            60,
            30
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

        // If the Ship doesn't have any lives left, head to game over screen
        if (this.ship.getHealth() <= 0) {
            this.ship.setHealth(3);
            Game.gameOverScreen = true;
        }

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

        if (this.ship.isCollidingWithProjectile(this.blackhole) === true && Game.stateCounter3 === 1) {
            Game.blackholescreenIntoTiktok = false;
            Game.blackholescreenIntoYoutube = false;
            Game.blackholescreenIntoTitle = true;
            Game.blackholescreen = false;
        }

        if (this.ship.isCollidingWithProjectile(this.blackhole) === true && Game.stateCounter2 === 1) {
            Game.blackholescreenIntoTiktok = false;
            Game.blackholescreenIntoYoutube = true;
            Game.blackholescreen = false;
            Game.stateCounter2 = 50;
            Game.stateCounter3 = 1; 
        }

        if (this.ship.isCollidingWithProjectile(this.blackhole) === true && Game.stateCounter === 0) {
            Game.blackholescreen = false;
            Game.blackholescreenIntoTiktok = true;
            Game.blackholescreenIntoYoutube = false;
            Game.stateCounter = 50;
            Game.stateCounter2 = 1;
        }


        // Move and draw all the game entities
        this.playerProjectiles.forEach((projectile) => {
            if (projectile.inBounds(this.canvas)) {
                projectile.draw(this.ctx);
                projectile.shootProjectileLeftToRight(this.canvas);

                // Check if the yes box is hit and handle accordingly
                if (projectile.isCollidingWithProjectile(this.no)) {
                    // Move the black hole
                    this.blackhole.setYPos(this.canvas.height / 100 * 90);
                    this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                }
                // Check if the no box is hit and handle accordingly
                if (projectile.isCollidingWithProjectile(this.yes)) {
                    // Punish
                    this.ship.setHealth(this.ship.getHealth() - 1);
                    this.playerProjectiles = this.removeProjectilesWithId(this.playerProjectiles, projectile.getId());
                }
            }
        })

    }
}