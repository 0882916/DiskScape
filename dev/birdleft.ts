///<reference path="bird.ts"/>


// child of bird class
class BirdLeft extends Bird 
{
    constructor(g:PlayScreen) 
    {
        super(g, "bird-left")

        // negative speed between -3 and -8
        this._speed = -3.0 - Math.random() * 5.0
    }
}