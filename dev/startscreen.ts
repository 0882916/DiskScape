class StartScreen 
{
    private div: HTMLElement
    private game: Game

    constructor(g: Game) 
    {
        this.game = g
        this.div = document.createElement('start')
        document.body.appendChild(this.div)
        this.div.addEventListener("click", ()=>this.startClicked())
        this.div.innerHTML = 'PLAY'
    }

    public update()
    {

    }

    private startClicked() 
    {
        this.game.showPlayScreen()
    }
}