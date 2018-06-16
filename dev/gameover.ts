class GameOver 
{
    private div: HTMLElement
    private game: Game

    constructor(g: Game) 
    {
        this.game = g
        this.div = document.createElement("retry")
        document.body.appendChild(this.div)
        this.div.addEventListener("click", () => this.retryClicked())
        this.div.innerHTML = 'Retry'
    }

    public update() 
    {

    }

    private retryClicked() 
    {
        this.game.showPlayScreen()
    }
}