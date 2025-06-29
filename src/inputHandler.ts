export class InputHandler {
  keys: string[];

  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) &&
        !this.keys.includes(e.key)
      ) {
        this.keys.push(e.key);
      }
    });

    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        this.keys = this.keys.filter((key) => key !== e.key);
      }
    });
  }
}
