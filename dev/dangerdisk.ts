///<reference path="disk.ts"/>
// flying sheep with disk properties. Clicking it is dangerous as more disks will spawn,
// but its alot more rewarding the more you click

class DangerDisk extends Disk 
{
    constructor(g:PlayScreen) 
    {
        super(g, "disk2x")

        this._speed = 2 + Math.random() * 1
        
        this.htmlElement.addEventListener("click", () => this.targetDisk2X())
    }
}