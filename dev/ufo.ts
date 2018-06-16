class Ufo 
{
    private x:number = window.innerWidth
    private y:number = window.innerHeight

    private _speed:number = 10
    private amplitude:number = 2

    private tries:number = 3

    private htmlElement:HTMLElement;

    private game:PlayScreen


    public constructor(g:PlayScreen) 
    {
        this.game = g;

        this.htmlElement = document.createElement('ufo')
        document.body.appendChild(this.htmlElement)

        this.htmlElement.addEventListener("click", () => this.kill())
    }

    public kill() 
    {
        this.htmlElement.remove()

        this.game.updateScore(2500)
    }

    public update() {

        this.y += this.amplitude
        this.x += this._speed
        
        if (this.x > window.innerWidth) 
        {
            this.startRight()
        } 
        if (this.x < 0 - this.htmlElement.getBoundingClientRect().width)
        {
             this.startLeft()
        }

        if (this.y > window.innerHeight * 0.2)
        {
            this.amplitude = -2
        }

        if (this.y < window.innerHeight * 0.1)
        {
            this.amplitude = 2
        }

        if (this.tries == 0)
        {
            this.htmlElement.remove()
        }

        this.htmlElement.style.left = `${this.x}px`
        this.htmlElement.style.top = `${this.y}px`
    }

    private startRight() 
    {
        this.x = window.innerWidth
        this.y = 0.25 * window.innerHeight * Math.random()
        this._speed = -10
        this.tries -= 1
    }

    private startLeft() 
    {
        this.x = 0 - this.htmlElement.getBoundingClientRect().width
        this.y = 0.25 * window.innerHeight * Math.random()
        this._speed = 10
        this.tries -= 1
    }

}