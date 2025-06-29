import { canvas } from "./canvas.js";
export class Layer {
    constructor(image, speedModifier, gameSpeed) {
        this.width = 0;
        this.height = 0;
        this.scale = 1;
        this.scaledWidth = 0;
        this.scaledHeight = 0;
        this.x = 0;
        this.y = 0;
        this.x2 = 0;
        this.loaded = false;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
            this.scale = canvas.height / this.height;
            this.scaledWidth = this.width * this.scale;
            this.scaledHeight = canvas.height;
            this.x = 0;
            this.y = 0;
            this.x2 = this.scaledWidth;
            this.loaded = true;
        };
    }
    update(gameSpeed) {
        if (!this.loaded)
            return;
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.scaledWidth) {
            this.x = this.x2 + this.scaledWidth - this.speed;
        }
        if (this.x2 <= -this.scaledWidth) {
            this.x2 = this.x + this.scaledWidth - this.speed;
        }
        this.x -= this.speed;
        this.x2 -= this.speed;
    }
    draw(ctx) {
        if (!this.loaded)
            return;
        ctx.drawImage(this.image, this.x, this.y, this.scaledWidth, this.scaledHeight);
        ctx.drawImage(this.image, (this.x2 - 1), this.y, this.scaledWidth, this.scaledHeight);
    }
}
