class Disk {

    protected _speed:number = 3;

    private x:number = 0;
    private y:number = 0;
    
    protected htmlElement:HTMLElement;

    private game:Game;

    public constructor(g:Game, tag:string){

        this.game = g;

        this.htmlElement = document.createElement(tag);
        document.body.appendChild(this.htmlElement);
    }

    public target() {
        this.game.updateScore(this.y * 0.25);

        this.htmlElement.remove();

        this.update();

        this.game.newDisk();
    }

    public update() {
        this.y -= this._speed;

        if (this.y > window.innerHeight) {
            this.gravity();
        }

        this.htmlElement.addEventListener("click", () => this.target());

        this.htmlElement.style.left = `${this.x}px`;
        this.htmlElement.style.top = `${this.y}px`;
    } 

    public gravity() {
        this._speed *= -0.8
    }
}

