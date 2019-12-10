///<reference path="GameObject.ts"/>
class Ship extends GameObject {
    private keyboardListener: KeyboardListener;

    /**
     * Construct a new Ship object.
     *
     * @param imgUrl url of the image to load
     * @param xPos X coordinate of its starting position
     * @param yPos y coordinate of its starting position
     * @param xVel x part of the velocity vector
     * @param yVel y part of the velocity vector
     */
    public constructor(
        imgUrl: string,
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        keyboardListener: KeyboardListener,
    ) {
        super(imgUrl, xPos, yPos, xVel, yVel);
        this.keyboardListener = keyboardListener;
    }
}