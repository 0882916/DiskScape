class GameOver 
{
    private div: HTMLElement
    private game: Game

    private playscreen: PlayScreen

    
    constructor(g: Game) 
    {
        this.game = g
        // create html element retry
        this.div = document.createElement("retry")
        document.body.appendChild(this.div)
        // add eventlistener click to retry
        this.div.addEventListener("click", () => this.retryClicked())
        // put text in the html element
        this.div.innerHTML = 'RETRY'

        // create html element score
        this.div = document.createElement("endscore")
        document.body.appendChild(this.div)
        // put text in the html element
        this.div.innerHTML = 'SCORE ' + this.game.score
    }



    private retryClicked() 
    {
        // show playscreen
        this.game.showPlayScreen()
    }
}