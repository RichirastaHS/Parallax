export class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener("keydown", (e) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) &&
                !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener("keyup", (e) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                this.keys = this.keys.filter((key) => key !== e.key);
            }
        });
    }
}
