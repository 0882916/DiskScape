///<reference path="disk.ts"/>


// child of disk class
class SpecialDisk extends Disk 
{
    constructor(g:PlayScreen) 
    {
        super(g, "disk2x")

        // speed between 2 and 3
        this._speed = 2.0 + Math.random() * 1.0
        
        // eventlistener where clicking triggers targetDisk2X()
        this.htmlElement.addEventListener("click", () => this.targetDisk2X())
    }
}