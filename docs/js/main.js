"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Bird = (function () {
    function Bird(g, tag) {
        var _this = this;
        this.x = window.innerWidth;
        this.y = 0.3 * window.innerHeight + 0.6 * window.innerHeight * Math.random();
        this.deadBird = 0;
        this.game = g;
        this.htmlElement = document.createElement(tag);
        document.body.appendChild(this.htmlElement);
        this.htmlElement.addEventListener("click", function () { return _this.kill(); });
    }
    Bird.prototype.kill = function () {
        this.htmlElement.remove();
        this.game.updateScore(-250);
        this.birdsClicked();
        this.sound.playSeaGull();
        for (var i = -1; i <= this.deadBird; i++) {
            this.game.newBird();
        }
    };
    Bird.prototype.update = function () {
        this.x += this._speed;
        if (this.x > window.innerWidth) {
            this.startLeft();
        }
        if (this.x < 0 - this.htmlElement.getBoundingClientRect().width) {
            this.startRight();
        }
        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = this.y + "px";
    };
    Bird.prototype.startRight = function () {
        this.x = window.innerWidth;
        this.y = 0.3 * window.innerHeight + 0.5 * window.innerHeight * Math.random();
    };
    Bird.prototype.startLeft = function () {
        this.x = 0 - this.htmlElement.getBoundingClientRect().width;
        this.y = 0.3 * window.innerHeight + 0.5 * window.innerHeight * Math.random();
    };
    Bird.prototype.birdsClicked = function () {
        this.deadBird += 1;
    };
    return Bird;
}());
var BirdLeft = (function (_super) {
    __extends(BirdLeft, _super);
    function BirdLeft(g) {
        var _this = _super.call(this, g, "bird-left") || this;
        _this._speed = -3 - Math.random() * 5;
        return _this;
    }
    return BirdLeft;
}(Bird));
var BirdRight = (function (_super) {
    __extends(BirdRight, _super);
    function BirdRight(g) {
        var _this = _super.call(this, g, "bird-right") || this;
        _this._speed = 3 + Math.random() * 5;
        return _this;
    }
    return BirdRight;
}(Bird));
var Disk = (function () {
    function Disk(g, tag) {
        this.x = 0.2 * window.innerWidth + 0.6 * Math.random() * window.innerWidth;
        this.y = window.innerHeight;
        this.posX = window.innerWidth / 2;
        this.posY = window.innerHeight;
        this.disk2x = 1;
        this.game = g;
        this.htmlElement = document.createElement(tag);
        document.body.appendChild(this.htmlElement);
        this.htmlElement.style.left = this.posX + "px";
        this.htmlElement.style.top = this.posY + "px";
    }
    Disk.prototype.targetDisk = function () {
        if (this._speed > 0) {
            this.game.updateScore(Math.floor(this._speed * (this.y / 10)));
        }
        else {
            this.game.updateScore(-25);
        }
        this.sound.playGunShot();
        this.htmlElement.remove();
        this.game.removeDisk(this);
        this.game.newDisk();
    };
    Disk.prototype.targetDisk2X = function () {
        this.sound.playX2();
        this.htmlElement.remove();
        this.game.removeDisk(this);
        this.disk2XClicked();
        for (var i = 0; i <= this.disk2x; i++) {
            this.game.newDisk();
        }
    };
    Disk.prototype.disk2XClicked = function () {
        this.disk2x + 1;
        this.game.updateScore(1250);
    };
    Disk.prototype.gravity = function () {
        this._speed = -2.5;
    };
    Disk.prototype.respawn = function () {
        this.sound.playLoseLife();
        this._speed = 5 + Math.random() * 3;
        this.x = (0.1 * window.innerWidth) + ((0.8 * Math.random() * window.innerWidth) - this.htmlElement.getBoundingClientRect().width);
        this.game.updateScore(-100);
        this.game.updateLives(-1);
    };
    Disk.prototype.update = function () {
        this.y -= this._speed;
        if (this.y < 0 + 0.1 * window.innerHeight || this.y < 0 + (0.1 * window.innerHeight) + 10) {
            this.gravity();
        }
        if (this.y > window.innerHeight + this.htmlElement.getBoundingClientRect().height + 50) {
            this.respawn();
        }
        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = this.y + "px";
    };
    return Disk;
}());
var DangerDisk = (function (_super) {
    __extends(DangerDisk, _super);
    function DangerDisk(g) {
        var _this = _super.call(this, g, "disk2x") || this;
        _this._speed = 2 + Math.random() * 1;
        _this.htmlElement.addEventListener("click", function () { return _this.targetDisk2X(); });
        return _this;
    }
    return DangerDisk;
}(Disk));
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.disk = [];
        this.bird = [];
        this.ufo = [];
        this.disks = 1;
        this.birds = 3;
        this.score = 0;
        this.life = 25;
        console.log("game started - time to win");
        this.game = g;
        this.wall = document.createElement('wall');
        document.body.appendChild(this.wall);
        this.scoreDisplay = document.createElement("score");
        document.body.appendChild(this.scoreDisplay);
        this.lifeDisplay = document.createElement("lives");
        document.body.appendChild(this.lifeDisplay);
        for (var i = 0; i < this.birds; i++) {
            if (Math.random() < 0.5) {
                this.bird.push(new BirdRight(this));
            }
            else {
                this.bird.push(new BirdLeft(this));
            }
        }
        for (var i = 0; i < this.disks; i++) {
            this.disk.push(new NormalDisk(this));
        }
        this.updateScore(0);
        this.updateLives(0);
        this.update();
    }
    PlayScreen.prototype.newDisk = function () {
        if (Math.random() < 0.10) {
            this.disk.push(new DangerDisk(this));
        }
        else {
            this.disk.push(new NormalDisk(this));
            if (Math.random() < 0.075) {
                this.ufo.push(new Ufo(this));
            }
        }
    };
    PlayScreen.prototype.removeDisk = function (disk) {
        var i = this.disk.indexOf(disk);
        this.disk.splice(i, 1);
    };
    PlayScreen.prototype.newBird = function () {
        if (Math.random() < 0.50) {
            this.bird.push(new BirdLeft(this));
        }
        else {
            this.bird.push(new BirdRight(this));
        }
    };
    PlayScreen.prototype.update = function () {
        var _this = this;
        for (var _i = 0, _a = this.bird; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update();
        }
        for (var _b = 0, _c = this.disk; _b < _c.length; _b++) {
            var d = _c[_b];
            d.update();
        }
        for (var _d = 0, _e = this.ufo; _d < _e.length; _d++) {
            var u = _e[_d];
            u.update();
        }
        if (this.life == 0) {
            this.gameOver();
        }
        requestAnimationFrame(function () { return _this.update(); });
    };
    PlayScreen.prototype.updateScore = function (points) {
        this.score = this.score + points;
        this.scoreDisplay.innerHTML = "Score: " + this.score;
    };
    PlayScreen.prototype.updateLives = function (lives) {
        this.life = this.life + lives;
        this.lifeDisplay.innerHTML = "Lives: " + this.life;
    };
    PlayScreen.prototype.gameOver = function () {
        this.game.showGameOverScreen();
    };
    return PlayScreen;
}());
var Game = (function () {
    function Game() {
        this.currentScreen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        this.currentScreen.update();
    };
    Game.prototype.showPlayScreen = function () {
        document.body.innerHTML = '';
        this.currentScreen = new PlayScreen(this);
    };
    Game.prototype.showGameOverScreen = function () {
        document.body.innerHTML = '';
        this.currentScreen = new GameOver(this);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOver = (function () {
    function GameOver(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("retry");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.retryClicked(); });
        this.div.innerHTML = 'Retry';
    }
    GameOver.prototype.update = function () {
    };
    GameOver.prototype.retryClicked = function () {
        this.game.showPlayScreen();
    };
    return GameOver;
}());
var NormalDisk = (function (_super) {
    __extends(NormalDisk, _super);
    function NormalDisk(g) {
        var _this = _super.call(this, g, "disk") || this;
        _this._speed = 2 + Math.random() * 1;
        _this.htmlElement.addEventListener("click", function () { return _this.targetDisk(); });
        return _this;
    }
    return NormalDisk;
}(Disk));
var Sound = (function () {
    function Sound() {
        this.soundFiles = ['./sounds/217.mp3', './sounds/226.mp3', './sounds/231.mp3', './sounds/2767.mp3'];
        this.sounds = [];
        for (var i = 0; i < 4; i++) {
            var h = new Howl({
                src: [this.soundFiles[i]],
                loop: false
            });
            this.sounds.push(h);
        }
    }
    Sound.getInstance = function () {
        if (Sound.instance == null) {
            Sound.instance = new Sound();
        }
        return Sound.instance;
    };
    Sound.prototype.playSeaGull = function () {
        this.sounds[0].play();
    };
    Sound.prototype.playGunShot = function () {
        this.sounds[1].play();
    };
    Sound.prototype.playX2 = function () {
        this.sounds[2].play();
    };
    Sound.prototype.playLoseLife = function () {
        this.sounds[3].play();
    };
    Sound.instance = null;
    return Sound;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement('start');
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.startClicked(); });
        this.div.innerHTML = 'PLAY';
    }
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.startClicked = function () {
        this.game.showPlayScreen();
    };
    return StartScreen;
}());
var Ufo = (function () {
    function Ufo(g) {
        var _this = this;
        this.x = window.innerWidth;
        this.y = window.innerHeight;
        this._speed = 10;
        this.amplitude = 2;
        this.tries = 3;
        this.game = g;
        this.htmlElement = document.createElement('ufo');
        document.body.appendChild(this.htmlElement);
        this.htmlElement.addEventListener("click", function () { return _this.kill(); });
    }
    Ufo.prototype.kill = function () {
        this.htmlElement.remove();
        this.game.updateScore(2500);
    };
    Ufo.prototype.update = function () {
        this.y += this.amplitude;
        this.x += this._speed;
        if (this.x > window.innerWidth) {
            this.startRight();
        }
        if (this.x < 0 - this.htmlElement.getBoundingClientRect().width) {
            this.startLeft();
        }
        if (this.y > window.innerHeight * 0.2) {
            this.amplitude = -2;
        }
        if (this.y < window.innerHeight * 0.1) {
            this.amplitude = 2;
        }
        if (this.tries == 0) {
            this.htmlElement.remove();
        }
        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = this.y + "px";
    };
    Ufo.prototype.startRight = function () {
        this.x = window.innerWidth;
        this.y = 0.25 * window.innerHeight * Math.random();
        this._speed = -10;
        this.tries -= 1;
    };
    Ufo.prototype.startLeft = function () {
        this.x = 0 - this.htmlElement.getBoundingClientRect().width;
        this.y = 0.25 * window.innerHeight * Math.random();
        this._speed = 10;
        this.tries -= 1;
    };
    return Ufo;
}());
//# sourceMappingURL=main.js.map