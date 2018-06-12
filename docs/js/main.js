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
        this.deadBird + 1;
    };
    return Bird;
}());
var BirdLeft = (function (_super) {
    __extends(BirdLeft, _super);
    function BirdLeft(g) {
        var _this = _super.call(this, g, "bird-left") || this;
        _this._speed = -3 - Math.random() * 7;
        return _this;
    }
    return BirdLeft;
}(Bird));
var BirdRight = (function (_super) {
    __extends(BirdRight, _super);
    function BirdRight(g) {
        var _this = _super.call(this, g, "bird-right") || this;
        _this._speed = 3 + Math.random() * 7;
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
        this.deadSheep = 0;
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
            this.game.updateScore(-50);
        }
        this.htmlElement.remove();
        this.game.newDisk();
    };
    Disk.prototype.targetSheep = function () {
        this.htmlElement.remove();
        this.sheepClicked();
        for (var i = -1; i <= this.deadSheep; i++) {
            this.game.newDisk();
        }
    };
    Disk.prototype.sheepClicked = function () {
        this.deadSheep + 1;
        this.game.updateScore(500 + 500 * this.deadSheep);
    };
    Disk.prototype.gravity = function () {
        this._speed = -4;
    };
    Disk.prototype.respawn = function () {
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
        if (this.y > window.innerHeight + this.htmlElement.getBoundingClientRect().height) {
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
        var _this = _super.call(this, g, "sheep") || this;
        _this._speed = 5 + Math.random() * 3;
        _this.htmlElement.addEventListener("click", function () { return _this.targetSheep(); });
        return _this;
    }
    return DangerDisk;
}(Disk));
var Game = (function () {
    function Game() {
        this.disk = [];
        this.bird = [];
        this.disks = 1;
        this.birds = 3;
        this.score = 0;
        this.life = 25;
        console.log("game started - time to win");
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
    Game.prototype.newDisk = function () {
        if (Math.random() < 0.15) {
            this.disk.push(new DangerDisk(this));
        }
        else {
            this.disk.push(new NormalDisk(this));
            if (Math.random() < 0.03) {
                this.ufo = new Ufo(this);
            }
        }
    };
    Game.prototype.newBird = function () {
        if (Math.random() < 0.50) {
            this.bird.push(new BirdLeft(this));
        }
        else {
            this.bird.push(new BirdRight(this));
        }
    };
    Game.prototype.update = function () {
        var _this = this;
        for (var _i = 0, _a = this.bird; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update();
        }
        for (var _b = 0, _c = this.disk; _b < _c.length; _b++) {
            var d = _c[_b];
            d.update();
        }
        if (this.ufo) {
            this.ufo.update();
        }
        requestAnimationFrame(function () { return _this.update(); });
    };
    Game.prototype.updateScore = function (points) {
        this.score = this.score + points;
        this.scoreDisplay.innerHTML = "Score: " + this.score;
    };
    Game.prototype.updateLives = function (lives) {
        this.life = this.life + lives;
        this.lifeDisplay.innerHTML = "Lives: " + this.life;
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var NormalDisk = (function (_super) {
    __extends(NormalDisk, _super);
    function NormalDisk(g) {
        var _this = _super.call(this, g, "disk") || this;
        _this._speed = 5 + Math.random() * 3;
        _this.htmlElement.addEventListener("click", function () { return _this.targetDisk(); });
        return _this;
    }
    return NormalDisk;
}(Disk));
//# sourceMappingURL=main.js.map