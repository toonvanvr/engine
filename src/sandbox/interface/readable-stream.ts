import { Interface } from "../../core/class.interface";

export class ReadableStreamInterface extends Interface {
  buffers: Buffer[] = [];
  private _stream: NodeJS.ReadStream;
  private _input: Promise<Buffer | null> | null = new Promise(
    (resolve, reject) => (this._resolve = resolve)
  );
  private _resolve!: (data: Buffer | null) => void;
  _listener: ((data: Buffer) => void) | null = null;

  constructor(stream = process.stdin) {
    super();
    this._stream = stream;
  }

  public listen() {
    this._listener = (data) => {
      this.updatePromise(data);
    };
    this._stream.addListener("data", this._listener);
    this.debugListeners()
  }

  public close() {
    this._stream.removeListener(
      "data",
      this._listener as NonNullable<this["_listener"]>
    );
    const resolve = this._resolve
    this._input = null;
    resolve(null)
    this.debugListeners()
    // this does not close the stream properly?
  }

  private updatePromise(data: Buffer) {
    const resolve = this._resolve;
    this._input = new Promise((resolve, reject) => (this._resolve = resolve));
    resolve(data);
  }

  public async *onLetter() {
    while (this._input) {
      const data = await this._input;
      if (data) {
        const str = data.toString("utf-8");
        for (const char of str) {
          if (char.match(/\w/)) {
            yield char;
          }
        }
      }
    }
    return
  }

  private debugListeners() {
    console.log(
      "LISTENERS:",
      this._stream.listenerCount("data"),
      this._stream.listeners
    );
  }
}
