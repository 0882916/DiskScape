class Game {

    private disk:Disk;
    private bird:Bird;

    private scoreDisplay:HTMLElement;
    private score:number = 0;


    constructor(){
        console.log("game started - time to win")

        this.scoreDisplay = document.createElement("score");
        document.body.appendChild(this.scoreDisplay);

        this.disk = new NormalDisk(this);

        this.bird = new BirdRight(this);

        this.updateScore(0);

        this.update();
    }

    public newDisk() {
        // 10% kans op een disk die je niet moet klikken
        if (Math.random() < 0.10) {
            this.disk = new DangerDisk(this);
        } else {
            this.disk = new NormalDisk(this);
        }
    }

    public newBird() {
        if (Math.random() < 0.50) {
            this.bird = new BirdRight(this);
        } else {
            this.bird = new BirdLeft(this);
        }
    }

    public update() {
        this.disk.update();
        this.bird.update();

        requestAnimationFrame( () => this.update() )
    }

    public updateScore(points:number) {
        this.score = this.score + points;
        this.scoreDisplay.innerHTML = "Score: " + this.score;
    }
}

window.addEventListener("load", () => new Game())