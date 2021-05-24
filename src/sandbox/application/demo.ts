import { Application } from '../../core/class.application';
import { ReadableStreamInterface } from '../interface/readable-stream';
import whyrun from 'why-is-node-running'
export default class App extends Application {
  // public readonly scope = new Scope()

  private stdin = new ReadableStreamInterface(process.stdin)

  constructor() {
    super()
  }

  async run(): Promise<void> {
    this.stdin.listen()
    console.log('You can now start writing and end with letter "q"')
    for await (const letter of this.stdin.onLetter()) {
      console.log('> ', letter)
      if (letter === 'q') {
        this.stdin.close()
      }
    }
    whyrun()
  }
}
