import { Application } from "../core/class.application";
import { ReadableStreamInterface } from "../core/std/interface/readable-stream";
import { DemoScope } from "./scope.demo";
export default class App extends Application {
  public readonly scope = new DemoScope();

  private stdin = new ReadableStreamInterface(process.stdin);

  constructor() {
    super();
  }

  async run(): Promise<void> {
    this.stdin.listen();
    console.log('You can now start writing and end with letter "q"');
    for await (const char of this.stdin.onLetter()) {
      this.handleChar(char);
    }
  }

  stop() {
    this.logHistory();
    this.stdin.close();
  }

  handleChar(char: string) {
    console.log(">", char);
    if (char.match(/\S/)) {
      this.scope.addHistory(char);
    }
    switch (char) {
      case "q":
        this.stop();
        break;
      case "h":
        this.logHistory();
        break;
      default:
        break;
    }
  }

  logHistory() {
    console.log("Non-whitespace input was:", this.scope.history);
  }
}
