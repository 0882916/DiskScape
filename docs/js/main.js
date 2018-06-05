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
        this.x = 0;
        this.y = 0;
        this.posX = window.innerWidth / 2;
        this.posY = window.innerHeight;
        this.game = g;
        this.htmlElement = document.createElement(tag);
        document.body.appendChild(this.htmlElement);
        this.htmlElement.style.left = this.posX + "px";
        this.htmlElement.style.top = this.posY + "px";
    }
    Bird.prototype.kill = function () {
        this.htmlElement.remove();
        this.game.updateScore(this._speed * -100);
        this.update();
        this.game.newBird();
    };
    Bird.prototype.update = function () {
        var _this = this;
        this.x += this._speed;
        if (this.x > window.innerWidth || this.x < -this.htmlElement.getBoundingClientRect().width) {
            this.startOpposite();
        }
        this.htmlElement.addEventListener("click", function () { return _this.kill(); });
        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = this.y + "px";
    };
    Bird.prototype.startOpposite = function () {
        this.x = this.htmlElement.getBoundingClientRect().width * -1;
        this.y = (100 + Math.random() * (window.innerHeight - 300 - this.htmlElement.getBoundingClientRect().height));
    };
    return Bird;
}());
var BirdLeft = (function (_super) {
    __extends(BirdLeft, _super);
    function BirdLeft(g) {
        var _this = _super.call(this, g, "bird-left") || this;
        _this._speed = -3;
        return _this;
    }
    return BirdLeft;
}(Bird));
var BirdRight = (function (_super) {
    __extends(BirdRight, _super);
    function BirdRight(g) {
        var _this = _super.call(this, g, "bird-right") || this;
        _this._speed = 3;
        return _this;
    }
    return BirdRight;
}(Bird));
var Disk = (function () {
    function Disk(g, tag) {
        this._speed = 3;
        this.x = 0;
        this.y = 0;
        this.game = g;
        this.htmlElement = document.createElement(tag);
        document.body.appendChild(this.htmlElement);
    }
    Disk.prototype.target = function () {
        this.game.updateScore(this.y * 0.25);
        this.htmlElement.remove();
        this.update();
        this.game.newDisk();
    };
    Disk.prototype.update = function () {
        var _this = this;
        this.y -= this._speed;
        if (this.y > window.innerHeight) {
            this.gravity();
        }
        this.htmlElement.addEventListener("click", function () { return _this.target(); });
        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = this.y + "px";
    };
    Disk.prototype.gravity = function () {
        this._speed *= -0.8;
    };
    return Disk;
}());
var DangerDisk = (function (_super) {
    __extends(DangerDisk, _super);
    function DangerDisk(g) {
        return _super.call(this, g, "sheep") || this;
    }
    return DangerDisk;
}(Disk));
var Game = (function () {
    function Game() {
        this.score = 0;
        console.log("game started - time to win");
        this.scoreDisplay = document.createElement("score");
        document.body.appendChild(this.scoreDisplay);
        this.disk = new NormalDisk(this);
        this.bird = new BirdRight(this);
        this.updateScore(0);
        this.update();
    }
    Game.prototype.newDisk = function () {
        if (Math.random() < 0.10) {
            this.disk = new DangerDisk(this);
        }
        else {
            this.disk = new NormalDisk(this);
        }
    };
    Game.prototype.newBird = function () {
        if (Math.random() < 0.50) {
            this.bird = new BirdRight(this);
        }
        else {
            this.bird = new BirdLeft(this);
        }
    };
    Game.prototype.update = function () {
        var _this = this;
        this.disk.update();
        this.bird.update();
        requestAnimationFrame(function () { return _this.update(); });
    };
    Game.prototype.updateScore = function (points) {
        this.score = this.score + points;
        this.scoreDisplay.innerHTML = "Score: " + this.score;
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var NormalDisk = (function (_super) {
    __extends(NormalDisk, _super);
    function NormalDisk(g) {
        return _super.call(this, g, "disk") || this;
    }
    return NormalDisk;
}(Disk));
//# sourceMappingURL=main.js.map