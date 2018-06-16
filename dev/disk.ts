class Disk 
{
    // class playscreen
    private game:PlayScreen

    // html element adjustable by children 
    protected htmlElement:HTMLElement
    
    // speed adjustable by children
    protected _speed:number

    // coords where disks spawn 
    private x:number = 0.2 * window.innerWidth + 0.6 * Math.random() * window.innerWidth
    private y:number = window.innerHeight

    // amount of special disks clicked
    public disk2x:number = 1
    
    

    // constructor with class playscreen and tagname set by child
    public constructor(g:PlayScreen, tag:string)
    {
        this.game = g

        // create html element and put bird in it
        this.htmlElement = document.createElement(tag)
        document.body.appendChild(this.htmlElement)
    }


    public update() 
    {
        // make disk move vertically
        this.y -= this._speed

        // when y of disk exceeds 10% of window height
        if (this.y < 0 + 0.1 * window.innerHeight || this.y < 0 + (0.1 * window.innerHeight) + 10) 
        {
            // trigger gravity()
            this.gravity()
        }

        // when y of disk exceeds 10% of window height
        if (this.y > window.innerHeight + this.htmlElement.getBoundingClientRect().height + 50) 
        {
            // trigger respawn()
            this.respawn()
        }

        // update image
        this.htmlElement.style.left = `${this.x}px`
        this.htmlElement.style.top = `${this.y}px`
    } 


    // eventhandler from child: NormalDisk
    public targetDisk() 
    {
        // if speed of disk is higher than 0 (going upwards)
        if (this._speed > 0)
        {
            // give updateScore( speed * y coord /10 ) meaning the faster the disk the more points, 
            // and the lower the disk the more points
            this.game.updateScore(Math.floor(this._speed * (this.y / 10)))
        }
        // if speed is lower than 0, meaning its going downwards
        else
        {
            // give updateScore( -25 )
            this.game.updateScore(-25)
        }
        // remove disk in remove()
        this.htmlElement.remove()

        // splice disk in removeDisk()
        this.game.removeDisk(this)

        // add new disk in newDisk()
        this.game.newDisk()
    }


    // eventhandler from child: SpecialDisk
    public targetDisk2X() 
    {
        // remove disk in remove()
        this.htmlElement.remove()

        // splice disk in removeDisk()
        this.game.removeDisk(this)

        // add +1 to disk counter
        this.disk2XClicked()

        // for every clicked specialdisk, add an additional disk
        for (let i = 0; i <= this.disk2x; i++)
        {
            this.game.newDisk()
        }
    }

    public respawn()
    {
        // when disk reaches bottom of screen: reset random speed
        this._speed = 5 + Math.random() * 3

        // when disk reaches bottom of screen: reset x coord
        this.x = (0.1 * window.innerWidth) + ((0.8 * Math.random() * window.innerWidth) - this.htmlElement.getBoundingClientRect().width)

        // give updatescore ( -100 )
        this.game.updateScore(-100)

        // give updateLives ( -1 )
        this.game.updateLives(-1)
    }


    public gravity() 
    {
        // static speed to both child disks when reaching peak and returning to bottom of screen
        this._speed = -2.5
    }


    public disk2XClicked() {
        // specialdisk counter
        this.disk2x + 1

        // give updateScore ( 1250 )
        this.game.updateScore(1250)
    }
}

