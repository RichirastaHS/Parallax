import { InputHandler } from "./inputHandler.js";
import { canvas } from "./canvas.js";

export class Sprite {
  gameWidth: number;
  gameHeight: number;
  width: number = 96;
  height: number = 96;
  x: number = 0;
  y: number;
  image: HTMLImageElement;
  frameX: number = 0;
  maxFrame: number = 7;
  frameY: number = 0;
  fps: number = 20;
  frameTimer: number = 0;
  frameInterval: number;
  speed: number = 0;
  vx: number = 0;
  vy: number = 0;
  acceleration: number = 0.8;
  friction: number = 0.1;
  maxSpeed: number = 5;

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.y = this.gameHeight - this.height - 10;
    this.image = document.getElementById("playerImage") as HTMLImageElement;
    this.frameInterval = 1000 / this.fps;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      1 * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(input: InputHandler): void {
    if (this.frameTimer > this.frameInterval) {
      this.frameX = this.frameX >= this.maxFrame ? 0 : this.frameX + 1;
      this.frameTimer = 0;
    } else {
      this.frameTimer += 1000 / 60;
    }

    if (input.keys.includes("ArrowRight")) {
      this.vx += this.acceleration;
    } else if (input.keys.includes("ArrowLeft")) {
      this.vx -= this.acceleration;
    } else {
      this.vx *= this.friction;
    }

    this.vx = Math.max(Math.min(this.vx, this.maxSpeed), -this.maxSpeed);
    this.x += this.vx;

    if (input.keys.includes("ArrowUp")) {
      this.y -= 5;
      if (this.y < 0) this.y = 0;
    } else if (input.keys.includes("ArrowDown")) {
      this.y += 5;
      if (this.y + this.height > this.gameHeight)
        this.y = this.gameHeight - this.height;
    }

    if (this.x < 0) this.x = 0;
    if (this.x + this.width > this.gameWidth)
      this.x = this.gameWidth - this.width;
  }
}
