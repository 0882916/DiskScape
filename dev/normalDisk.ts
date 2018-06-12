///<reference path="disk.ts"/>
// target to click for points

class NormalDisk extends Disk 
{
    constructor(g:Game) 
    {
        super(g, "disk")

        this._speed = 5 + Math.random() * 3

        this.htmlElement.addEventListener("click", () => this.targetDisk())
    }
}

