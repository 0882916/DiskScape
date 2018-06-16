class Bird 
{
    // class playscreen
    private game:PlayScreen

    protected htmlElement:HTMLElement

    // speed adjustable by children
    protected _speed:number

    // coords where birds spawn
    private x:number = window.innerWidth
    private y:number = 0.3 * window.innerHeight + 0.6 * window.innerHeight * Math.random()

    // amount of birds killed
    private deadBird:number = 1



    // constructor with class playscreen and tagname set by child
    public constructor(g:PlayScreen, tag:string) 
    {
        this.game = g;

        // create html element and put bird in it
        this.htmlElement = document.createElement(tag)
        document.body.appendChild(this.htmlElement)

        // event listener to kill bird when clicking on it
        this.htmlElement.addEventListener("click", () => this.kill())
    }


    // things that happen when bird is murdered - sad :(
    public kill() 
    {
        // remove bird
        this.htmlElement.remove()

        // splice bird in removeBird()
        this.game.removeBird(this)

        // add score to updateScore ( -250 )
        this.game.updateScore(-250)

        // add +1 to bird counter
        this.birdsClicked()

        // for every clicked bird, add an additional bird
        for (let i = 0; i < this.deadBird; i++)
        {
            this.game.newBird()
        }
    }


    public update() {
        // make bird move horizontally
        this.x += this._speed;

        // if bird exceeds screenwidth right
        if(this.x > window.innerWidth) 
        {
            // start left
            this.startLeft()
        } 

        // if bird exceeds screenwidth left
        if (this.x < 0 - this.htmlElement.getBoundingClientRect().width)
        {
            // start right
            this.startRight()
        } 

        this.htmlElement.style.left = `${this.x}px`
        this.htmlElement.style.top = `${this.y}px`
    }


    private startRight() 
    {
        // put bird somewhere between 0.3 and 0.8 screenheight on right side
        this.y = 0.3 * window.innerHeight + 0.5 * window.innerHeight * Math.random()
        this.x = window.innerWidth
    }


    private startLeft() 
    {
        // put bird somewhere between 0.3 and 0.8 screenheight on left side
        this.y = 0.3 * window.innerHeight + 0.5 * window.innerHeight * Math.random()
        this.x = 0 - this.htmlElement.getBoundingClientRect().width
    }


    public birdsClicked() 
    {
        // dead bird counter
        this.deadBird += 1
    }
}