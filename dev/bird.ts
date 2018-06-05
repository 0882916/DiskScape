class Bird {

    protected _speed:number;
    private x:number = 0;
    private y:number = 0;

    private posX:number = window.innerWidth / 2;
    private posY:number = window.innerHeight;


    protected htmlElement:HTMLElement;

    private game:Game;

    public constructor(g:Game, tag:string) {

        this.game = g;

        this.htmlElement = document.createElement(tag);
        document.body.appendChild(this.htmlElement);

        this.htmlElement.style.left = `${this.posX}px`;
        this.htmlElement.style.top = `${this.posY}px`;
    }

    public kill() {
        this.htmlElement.remove();

        this.game.updateScore(this._speed * -100);

        this.update();

        this.game.newBird();
    }

    public update() {
        this.x += this._speed;

        if(this.x > window.innerWidth || this.x < - this.htmlElement.getBoundingClientRect().width) {
            this.startOpposite();
        }

        // if(this.x < window.innerWidth) {
        //     this.startOpposite(1);
        // }
        
        this.htmlElement.addEventListener("click", () => this.kill());

        this.htmlElement.style.left = `${this.x}px`;
        this.htmlElement.style.top = `${this.y}px`;
    }

    private startOpposite() {

        // switch(c) {
        //     case 0:
                this.x = this.htmlElement.getBoundingClientRect().width * -1;
                this.y = (100 + Math.random() * (window.innerHeight - 300 - this.htmlElement.getBoundingClientRect().height));
                // break;
            // case 1:
            //     this.x = this.htmlElement.getBoundingClientRect().width * -1;
            //     this.y = (100 + Math.random() * (window.innerHeight - 300 - this.htmlElement.getBoundingClientRect().height));
            //     break;
        // }      
    }
}