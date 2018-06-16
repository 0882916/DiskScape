class NormalDisk extends Disk 
{
    constructor(g:PlayScreen) 
    {
        super(g, "disk")

        this._speed = 2 + Math.random() * 1

        this.htmlElement.addEventListener("click", () => this.targetDisk())
    }
}

