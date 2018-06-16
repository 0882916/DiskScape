/// <reference path="playscreen.ts"/>

class Game 
{
    private currentScreen:any

    public score: number = 25000

    constructor() 
    {
        // create start screen
        this.currentScreen = new StartScreen(this)
    }


    // show playscreen
    public showPlayScreen():void
    {
        document.body.innerHTML = ''
        this.currentScreen = new PlayScreen(this)
    }


    // show gameover screen
    public showGameOverScreen():void 
    {
        document.body.innerHTML = ''
        this.currentScreen = new GameOver(this)
    }
}
window.addEventListener("load", () => new Game())