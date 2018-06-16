/// <reference path="playscreen.ts"/>

class Game 
{
    private currentScreen:any

    constructor() 
    {
        this.currentScreen = new StartScreen(this)
        this.gameLoop()
    }

    private gameLoop():void
    {
        this.currentScreen.update()
    }

    public showPlayScreen():void
    {
        document.body.innerHTML = ''
        this.currentScreen = new PlayScreen(this)
    }

    public showGameOverScreen():void 
    {
        document.body.innerHTML = ''
        this.currentScreen = new GameOver(this)
    }
}

window.addEventListener("load", () => new Game())