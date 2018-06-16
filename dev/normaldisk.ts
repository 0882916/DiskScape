///<reference path="disk.ts"/>


// child of disk class
class NormalDisk extends Disk 
{
    constructor(g:PlayScreen) 
    {
        super(g, "disk")

        // speed between 2 and 3
        this._speed = 2.0 + Math.random() * 1.0

        // eventlistener where clicking triggers targetDisk()
        this.htmlElement.addEventListener("click", () => this.targetDisk())
    }
}

