///<reference path="bird.ts"/>
// flying sheep with disk properties, but clicking it is bad

class BirdLeft extends Bird 
{
    constructor(g:Game) 
    {
        super(g, "bird-left")

        this._speed = -3 - Math.random() * 7
    }
}