class PlayScreen 
{
    // class game
    private game:Game

    // arrays for adding disks, birds and ufo's
    private disk:Disk[] = []
    private bird:Bird[] = []
    private ufo:Ufo[] = []

    // number of disks and birds appearing at start of game
    private disks:number = 1
    private birds:number = 3

    // html element for placing wall
    private wall:HTMLElement

    // html element for displaying score
    private scoreDisplay:HTMLElement

    // html element for displaying lives
    private lifeDisplay:HTMLElement
    public life:number = 25

    // html element for clear buttons
    private clearDisks:HTMLElement
    private clearBirds:HTMLElement


    // constructor with class game
    constructor(g: Game)
    {
        this.game = g

        // create html element and put wall in it
        this.wall = document.createElement('wall')
        document.body.appendChild(this.wall)

        // create html element and put score in it
        this.scoreDisplay = document.createElement("score")
        document.body.appendChild(this.scoreDisplay)

        // create html element and put lives in it
        this.lifeDisplay = document.createElement("lives")
        document.body.appendChild(this.lifeDisplay)

        // create html element and put lives in it
        this.clearDisks = document.createElement("cleardisks")
        document.body.appendChild(this.clearDisks)
        this.clearDisks.innerHTML = 'DISK NUKE: 25.000'
        
        // create html element and put lives in it
        this.clearBirds = document.createElement("clearbirds")
        document.body.appendChild(this.clearBirds)
        this.clearBirds.innerHTML = 'BIRD NUKE: 10.000'      

        console.log("game started - time to win")


        // loop through number of times stated in disk variable
        for (var i = 0; i < this.birds; i++) 
        {
            //add bird for every loop
            // for half of the time
            if (Math.random() < 0.5)
            {
                // create a bird moving right
                this.bird.push(new BirdRight(this))
            }         

            // other half of the time  
            else
            {
                // create a bird moving left
                this.bird.push(new BirdLeft(this))
            }
        }


        // loop through number of times stated in disk variable
        for (var i = 0; i < this.disks; i++) 
        {
            // add disk for every loop
            this.disk.push(new NormalDisk(this))
        }

        // update updateScore starting at 0
        this.updateScore(0)
        
        // update updateLives starting at 0
        this.updateLives(0)

        // update update
        this.update()
    }



    public update() 
    {
        // update each disk in array
        for (var d of this.disk) 
        {
            d.update()
        }

        // update each bird in array
        for (var b of this.bird) 
        {
            b.update()
        }

        // update each ufo in array
        for (var u of this.ufo) 
        {
            u.update()
        }

        // if life counter goes below 1 execuse gameOver()
        if (this.life == 0) 
        {
            this.gameOver()
        }

        this.clearDisks.addEventListener("click", () => this.resetDiskCount())

        this.clearBirds.addEventListener("click", () => this.resetBirdCount())  

        requestAnimationFrame( () => this.update() )
    }


    // pass through points from everything that happens in game
    public updateScore(points:number) 
    {
        // add number of points to score
        this.game.score = this.game.score + points

        // add number of score to html element
        this.scoreDisplay.innerHTML = "SCORE: " + this.game.score
    }


    // pass through lives from everything that happens in game
    public updateLives(lives:number)
    {
        // add number of lives to life
        this.life = this.life + lives

        // add number of life to html element
        this.lifeDisplay.innerHTML = "LIVES: " + this.life
    }


    public gameOver()
    {
        // execute showGameOverScreen()
        this.game.showGameOverScreen()
    }


    public newDisk() 
    {
        // when newDisk() is triggered, add 10% chance to create a special disk
        if (Math.random() < 0.10) 
        {
            this.disk.push(new SpecialDisk(this))
        } 

        // add normal disk other 90% of the time
        else 
        {
            this.disk.push(new NormalDisk(this))
            
            // while a normal disk is created, have a 7.5% chance to spawn an UFO
            if (Math.random() < 0.075) 
            {
                this.ufo.push(new Ufo(this))
            }
        }
    }


    // create new bird triggered by killing one 
    public newBird() 
    {
        // half the time 
        if (Math.random() < 0.50) 
        {
            // add a lefty
            this.bird.push(new BirdLeft(this))
        } 

        // other half the time 
        else 
        {
            // add a righty
            this.bird.push(new BirdRight(this))
        }
    }


    public removeDisk(disk:Disk) 
    {
        // destroy the item from the game even though it appears gone
        let i:number = this.disk.indexOf(disk)
        this.disk.splice(i, 1)
    }


    public removeBird(bird:Bird) 
    {
        // destroy the item from the game even though it appears gone
        let i:number = this.bird.indexOf(bird)
        this.bird.splice(i, 1)
    }

    
    public removeUfo(ufo:Ufo) 
    {
        // destroy the item from the game even though it appears gone
        let i:number = this.ufo.indexOf(ufo)
        this.ufo.splice(i, 1)
    }


    // TODO: make items disapear from screen
    public resetDiskCount() {
        if (this.game.score >= 25000)
        {
            this.updateScore(0)

            // this.disk.splice(Array.length, this.disk.length)
        }
    }


    public resetBirdCount() {
        if (this.game.score >= 10000)
        {
            this.updateScore(0)

            // this.bird.splice(Array.length, this.bird.length)
        }
    }
}