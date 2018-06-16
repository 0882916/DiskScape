class StartScreen 
{
    private div: HTMLElement
    private game: Game

    
    constructor(g: Game) 
    {
        this.game = g
        // create html element start
        this.div = document.createElement('start')
        document.body.appendChild(this.div)
        // add eventlistener click to start
        this.div.addEventListener("click", ()=>this.startClicked())
        // put text in the html element
        this.div.innerHTML = 'PLAY'
    }



    private startClicked() 
    {
        // show playscreen
        this.game.showPlayScreen()
    }
}