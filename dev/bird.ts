class Bird 
{
    private game:PlayScreen

    protected _speed:number

    private x:number = window.innerWidth
    private y:number = 0.3 * window.innerHeight + 0.6 * window.innerHeight * Math.random()

    private deadBird:number = 0

    protected htmlElement:HTMLElement;

    public constructor(g:PlayScreen, tag:string) 
    {
        this.game = g;

        this.htmlElement = document.createElement(tag)
        document.body.appendChild(this.htmlElement)

        this.htmlElement.addEventListener("click", () => this.kill())
    }

    public kill() 
    {
        this.htmlElement.remove()

        this.game.updateScore(-250)

        this.birdsClicked()

        for (let i = -1; i <= this.deadBird; i++)
        {
            this.game.newBird()
        }
    }

    public update() {
        this.x += this._speed;

        if(this.x > window.innerWidth) 
        {
            this.startLeft()
        } 
        if (this.x < 0 - this.htmlElement.getBoundingClientRect().width)
        {
            this.startRight()
        } 

        this.htmlElement.style.left = `${this.x}px`
        this.htmlElement.style.top = `${this.y}px`
    }

    private startRight() 
    {
        this.x = window.innerWidth
        this.y = 0.3 * window.innerHeight + 0.5 * window.innerHeight * Math.random()
    }

    private startLeft() 
    {
        this.x = 0 - this.htmlElement.getBoundingClientRect().width
        this.y = 0.3 * window.innerHeight + 0.5 * window.innerHeight * Math.random()
    }

    public birdsClicked() {
        this.deadBird += 1
    }
}