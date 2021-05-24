import { Scope } from "../../class.scope";

export class PublicScope extends Scope {
  private data = new Map<any, any>();

  get(key: any): any {
    return this.data.get(key);
  }

  set(key: any, value: any): void {
    this.data.set(key, value);
  }
}
