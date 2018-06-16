class Ufo 
{
    // class playscreen
    private game:PlayScreen
    
    // html element
    private htmlElement:HTMLElement;

    // horizontal speed of ufo
    private _speed:number = 10
    // vertical speed of ufo
    private amplitude:number = 2

    // coords where ufo spawns
    private x:number = window.innerWidth
    private y:number = window.innerHeight



    // amount of tries player gets to hit the ufo
    private tries:number = 2


    // constructor with class playscreen
    public constructor(g:PlayScreen) 
    {
        this.game = g;

        // create html element and put ufo in it
        this.htmlElement = document.createElement('ufo')
        document.body.appendChild(this.htmlElement)

        // event listener to kill ufo when clicking on it
        this.htmlElement.addEventListener("click", () => this.kill())
    }

    
    public kill() 
    {
        // remove ufo
        this.htmlElement.remove()

        // splice ufo in removeUfo()
        this.game.removeUfo(this)

        // add score to updateScore ( 2500 )
        this.game.updateScore(2500)
    }


    public update() {
        // make ufo move vertically
        this.y += this.amplitude
        // make ufo move horizontally
        this.x += this._speed

        // when ufo goes past the window width right
        if (this.x > window.innerWidth) 
        {
            if (Math.random() < 0.5) {
                // start right
                this.startRight()
            } else {
                // start left
                this.startLeft()
            }
        } 

        // when ufo goes past windowwidth left 
        if (this.x < 0 - this.htmlElement.getBoundingClientRect().width)
        {
            if (Math.random() < 0.5) {
                // start right
                this.startRight()
            } else {
                // start left
                this.startLeft()
            }
        }

        // when ufo goes past 20% of window height 
        if (this.y > window.innerHeight * 0.2)
        {
            // move upwards
            this.amplitude = -2
        }

        // when ufo goes below 10 of window height
        if (this.y < window.innerHeight * 0.1)
        {
            // move downwards
            this.amplitude = 2
        }

        // when tries goes below 1
        if (this.tries < 0)
        {
            // remove ufo from game
            this.htmlElement.remove()
        }

        this.htmlElement.style.left = `${this.x}px`
        this.htmlElement.style.top = `${this.y}px`
    }


    private startRight() 
    {
        // put ufo somewhere between 0 and 0.25 screenheight on right side
        this.x = window.innerWidth
        this.y = 0.25 * window.innerHeight * Math.random()
        // set speed to move left
        this._speed = -10
        // substract one try
        this.tries -= 1
    }


    private startLeft() 
    {
        // put ufo somewhere between 0 and 0.25 screenheight on left side
        this.x = 0 - this.htmlElement.getBoundingClientRect().width
        this.y = 0.25 * window.innerHeight * Math.random()
        // set speed to move right
        this._speed = 10
        // substract one try
        this.tries -= 1
    }
}