class PlayScreen 
{
    private game:Game

    private wall:HTMLElement

    private disk:Disk[] = []
    private bird:Bird[] = []
    private ufo:Ufo[] = []

    private disks:number = 1
    private birds:number = 3

    private scoreDisplay:HTMLElement
    public score:number = 0

    private lifeDisplay:HTMLElement
    public life:number = 25


    constructor(g: Game)
    {
        console.log("game started - time to win")

        this.game = g

        this.wall = document.createElement('wall')
        document.body.appendChild(this.wall)

        this.scoreDisplay = document.createElement("score")
        document.body.appendChild(this.scoreDisplay)

        this.lifeDisplay = document.createElement("lives")
        document.body.appendChild(this.lifeDisplay)

        for (var i = 0; i < this.birds; i++) 
        {
            if (Math.random() < 0.5)
            {
                this.bird.push(new BirdRight(this))
            }            
            else
            {
                this.bird.push(new BirdLeft(this))
            }
        }

        for (var i = 0; i < this.disks; i++) 
        {
            this.disk.push(new NormalDisk(this))
        }

        this.updateScore(0)
        
        this.updateLives(0)

        this.update()
    }

    public newDisk() 
    {
        // 10% kans op een disk die je niet moet klikken
        if (Math.random() < 0.10) 
        {
            this.disk.push(new DangerDisk(this))
        } 
        else 
        {
            this.disk.push(new NormalDisk(this))
            
            if (Math.random() < 0.075) 
            {
                this.ufo.push(new Ufo(this))
            }
        }
    }

    public removeDisk(disk:Disk) 
    {
        let i:number = this.disk.indexOf(disk)
        this.disk.splice(i, 1)
    }

    public newBird() 
    {
        if (Math.random() < 0.50) 
        {
            this.bird.push(new BirdLeft(this))
        } 
        else 
        {
            this.bird.push(new BirdRight(this))
        }
    }
    

    public update() 
    {
        for (var b of this.bird) 
        {
            b.update()
        }

        for (var d of this.disk) 
        {
            d.update()
        }

        for (var u of this.ufo) 
        {
            u.update()
        }

        if (this.life == 0) 
        {
            this.gameOver()
        }

        requestAnimationFrame( () => this.update() )
    }

    public updateScore(points:number) 
    {
        this.score = this.score + points
        this.scoreDisplay.innerHTML = "Score: " + this.score
    }

    public updateLives(lives:number)
    {
        this.life = this.life + lives
        this.lifeDisplay.innerHTML = "Lives: " + this.life
    }

    public gameOver()
    {
        this.game.showGameOverScreen()
    }
}