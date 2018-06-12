///<reference path="disk.ts"/>
// flying sheep with disk properties, but clicking it is bad

class DangerDisk extends Disk 
{
    constructor(g:Game) 
    {
        super(g, "sheep")

        this._speed = 5 + Math.random() * 3
        
        this.htmlElement.addEventListener("click", () => this.targetSheep())
    }
}