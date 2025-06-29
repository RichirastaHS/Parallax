export class Sprite {
    constructor(gameWidth, gameHeight) {
        this.width = 96;
        this.height = 96;
        this.x = 0;
        this.frameX = 0;
        this.maxFrame = 7;
        this.frameY = 0;
        this.fps = 20;
        this.frameTimer = 0;
        this.speed = 0;
        this.vx = 0;
        this.vy = 0;
        this.acceleration = 0.8;
        this.friction = 0.1;
        this.maxSpeed = 5;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.y = this.gameHeight - this.height - 10;
        this.image = document.getElementById("playerImage");
        this.frameInterval = 1000 / this.fps;
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 1 * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(input) {
        if (this.frameTimer > this.frameInterval) {
            this.frameX = this.frameX >= this.maxFrame ? 0 : this.frameX + 1;
            this.frameTimer = 0;
        }
        else {
            this.frameTimer += 1000 / 60;
        }
        if (input.keys.includes("ArrowRight")) {
            this.vx += this.acceleration;
        }
        else if (input.keys.includes("ArrowLeft")) {
            this.vx -= this.acceleration;
        }
        else {
            this.vx *= this.friction;
        }
        this.vx = Math.max(Math.min(this.vx, this.maxSpeed), -this.maxSpeed);
        this.x += this.vx;
        if (input.keys.includes("ArrowUp")) {
            this.y -= 5;
            if (this.y < 0)
                this.y = 0;
        }
        else if (input.keys.includes("ArrowDown")) {
            this.y += 5;
            if (this.y + this.height > this.gameHeight)
                this.y = this.gameHeight - this.height;
        }
        if (this.x < 0)
            this.x = 0;
        if (this.x + this.width > this.gameWidth)
            this.x = this.gameWidth - this.width;
    }
}
