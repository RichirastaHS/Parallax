import { canvas, ctx } from "./canvas.js";

export class Layer {
  public image: HTMLImageElement;
  public speedModifier: number;
  public speed: number;
  public width: number = 0;
  public height: number = 0;
  public scale: number = 1;
  public scaledWidth: number = 0;
  public scaledHeight: number = 0;
  public x: number = 0;
  public y: number = 0;
  public x2: number = 0;
  public loaded: boolean = false;

  constructor(image: HTMLImageElement, speedModifier: number, gameSpeed: number) {
  this.image = image;
  this.speedModifier = speedModifier;
  this.speed = gameSpeed * this.speedModifier;

  this.image.onload = () => {
    this.width = this.image.width;
    this.height = this.image.height;

    // Escala basada en ancho y alto del canvas
    const scaleWidth = canvas.width / this.width;
    const scaleHeight = canvas.height / this.height;

    // Usamos la mayor escala para cubrir toda la pantalla
    this.scale = Math.max(scaleWidth, scaleHeight);

    // Escalamos dimensiones
    this.scaledWidth = this.width * this.scale;
    this.scaledHeight = this.height * this.scale;

    // Posición inicial
    this.x = 0;
    this.y = 0;
    this.x2 = this.scaledWidth;

    this.loaded = true;
  };
}

  update(gameSpeed: number): void {
    if (!this.loaded) return;
    this.speed = gameSpeed * this.speedModifier;

    if (this.x <= -this.scaledWidth) {
      this.x = this.x2 + this.scaledWidth;
    }
    if (this.x2 <= -this.scaledWidth) {
      this.x2 = this.x + this.scaledWidth;
    }

    this.x -= this.speed;
    this.x2 -= this.speed;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.loaded) return;

    ctx.drawImage(this.image, this.x, this.y, this.scaledWidth, this.scaledHeight);
    ctx.drawImage(this.image, this.x2, this.y, this.scaledWidth, this.scaledHeight);
  }
}