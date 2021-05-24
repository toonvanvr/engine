import { Process } from "./class.process";
import { Scope } from "./class.scope";

/** A predetermined flow defining which I/O to use and how to process it */
export abstract class Application {
  public abstract readonly scope: Scope; // data

  public abstract run(): void;

  // processes are defined in the implementation
}
