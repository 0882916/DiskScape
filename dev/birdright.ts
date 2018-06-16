///<reference path="bird.ts"/>


class BirdRight extends Bird 
{
    // child of bird class
    constructor(g:PlayScreen) 
    {
        super(g, "bird-right")

        // negative speed between -3 and -8
        this._speed = 3.0 + Math.random() * 5.0
    }
}