import { Scope } from "../core/class.scope";

export class DemoScope extends Scope {
  #history: string = "";

  constructor() {
    super();
  }

  get history() {
    return this.#history;
  }

  addHistory(char: string) {
    this.#history += char;
  }
}
