class Disk 
{
    private game:PlayScreen
    private sound:Sound
    protected htmlElement:HTMLElement
    
    protected _speed:number

    private x:number = 0.2 * window.innerWidth + 0.6 * Math.random() * window.innerWidth
    private y:number = window.innerHeight

    private posX:number = window.innerWidth / 2
    private posY:number = window.innerHeight

    public disk2x:number = 1
    
    public constructor(g:PlayScreen, tag:string)
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
            this.game.updateScore(-25)
        }

        this.sound.playGunShot();
        this.htmlElement.remove()
        this.game.removeDisk(this)
        this.game.newDisk()
    }

    public targetDisk2X() 
    {
        this.sound.playX2();
        this.htmlElement.remove()
        this.game.removeDisk(this)
        this.disk2XClicked()

        for (let i = 0; i <= this.disk2x; i++)
        {
            this.game.newDisk()
        }
    }

    public disk2XClicked() {
        this.disk2x + 1
        this.game.updateScore(1250)
    }

    public gravity() 
    {
        this._speed = -2.5
    }

    public respawn()
    {
        this.sound.playLoseLife();
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

        if (this.y > window.innerHeight + this.htmlElement.getBoundingClientRect().height + 50) 
        {
            this.respawn()
        }
        this.htmlElement.style.left = `${this.x}px`
        this.htmlElement.style.top = `${this.y}px`
    } 
}

