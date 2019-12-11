class FacebookBoss extends Enemy {
    /**
     * Constructor
     * @param image 
     * @param xPos 
     * @param yPos 
     * @param xVel 
     * @param yVel 
     */
    public constructor(image: string, xPos: number, yPos: number, xVel: number, yVel: number, health: number) {
        super(image, xPos, yPos, xVel, yVel, health);
    }
}