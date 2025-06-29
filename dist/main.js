import { canvas, ctx } from "./canvas.js";
import { InputHandler } from "./inputHandler.js";
import { Sprite } from "./sprite.js";
import { Layer } from "./layer.js";
let gameSpeed = 1;
let currentBgId = Math.floor(Math.random() * 5) + 1;
const backgroundLayer1 = new Image();
const backgroundLayer2 = new Image();
const backgroundLayer3 = new Image();
const backgroundLayer4 = new Image();
cargarFondos(currentBgId);
const input = new InputHandler();
const sprite = new Sprite(canvas.width, canvas.height);
const layer1 = new Layer(backgroundLayer1, 1, gameSpeed);
const layer2 = new Layer(backgroundLayer2, 2, gameSpeed);
const layer4 = new Layer(backgroundLayer4, 2, gameSpeed);
const layer3 = new Layer(backgroundLayer3, 3, gameSpeed);
function cargarFondos(id) {
    backgroundLayer1.src = `public/assets/cielo/${id}.png`;
    backgroundLayer2.src = `public/assets/nubes_capa_1/${id}.png`;
    backgroundLayer3.src = `public/assets/nubes_capa_2/${id}.png`;
    backgroundLayer4.src = `public/assets/ambientales/${id}.png`;
}
const fondosDisponibles = [1, 2, 3, 4, 5];
let currentIndex = 0;
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'c') {
        currentIndex = (currentIndex + 1) % fondosDisponibles.length;
        cargarFondos(fondosDisponibles[currentIndex]);
    }
});
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    layer1.update(gameSpeed);
    layer1.draw(ctx);
    layer2.update(gameSpeed);
    layer2.draw(ctx);
    layer4.update(gameSpeed);
    layer4.draw(ctx);
    layer3.update(gameSpeed);
    layer3.draw(ctx);
    sprite.draw(ctx);
    sprite.update(input);
    requestAnimationFrame(animate);
}
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    sprite.gameWidth = canvas.width;
    sprite.gameHeight = canvas.height;
    [layer1, layer2, layer3].forEach((layer) => {
        if (layer.loaded) {
            layer.scale = canvas.height / layer.image.height;
            layer.scaledWidth = layer.image.width * layer.scale;
            layer.scaledHeight = canvas.height;
            layer.x = 0;
            layer.x2 = layer.scaledWidth;
        }
    });
});
animate();
