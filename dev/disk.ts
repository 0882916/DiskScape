class Disk 
{
    protected _speed:number

    private x:number = 0.2 * window.innerWidth + 0.6 * Math.random() * window.innerWidth
    private y:number = window.innerHeight

    private posX:number = window.innerWidth / 2
    private posY:number = window.innerHeight

    private deadSheep:number = 0
    
    protected htmlElement:HTMLElement

    private game:Game

    
    public constructor(g:Game, tag:string)
    {
        this.game = g

        this.htmlElement = document.createElement(tag)
        document.body.appendChild(this.htmlElement)

        this.htmlElement.style.left = `${this.posX}px`
        this.htmlElement.style.top = `${this.posY}px`
    }

    public targetDisk() 
    {
        if (this._speed > 0)
        {
            this.game.updateScore(Math.floor(this._speed * (this.y / 10)))
        }
        else
        {
            this.game.updateScore(-50)
        }

        this.htmlElement.remove()

        this.game.newDisk()
    }

    public targetSheep() 
    {
        this.htmlElement.remove()

        this.sheepClicked()

        for (let i = -1; i <= this.deadSheep; i++)
        {
            this.game.newDisk()
        }
    }

    public sheepClicked() {
        this.deadSheep + 1
        this.game.updateScore(500 + 500 * this.deadSheep)
    }

    public gravity() 
    {
        this._speed = -4
    }

    public respawn()
    {
        this._speed = 5 + Math.random() * 3
        this.x = (0.1 * window.innerWidth) + ((0.8 * Math.random() * window.innerWidth) - this.htmlElement.getBoundingClientRect().width)
        this.game.updateScore(-100)
        this.game.updateLives(-1)
    }

    public update() 
    {
        this.y -= this._speed

        if (this.y < 0 + 0.1 * window.innerHeight || this.y < 0 + (0.1 * window.innerHeight) + 10) 
        {
            this.gravity()
        }

        if (this.y > window.innerHeight + this.htmlElement.getBoundingClientRect().height) 
        {
            this.respawn()
        }
        this.htmlElement.style.left = `${this.x}px`
        this.htmlElement.style.top = `${this.y}px`
    } 
}

