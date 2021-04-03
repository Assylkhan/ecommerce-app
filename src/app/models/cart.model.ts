import { Position } from "./position.model";

export class Cart {
  _id?: any;
  userId?: string;
  positions?: Position[];

  public constructor(init?: Partial<Cart>) {
    Object.assign(this, init);
  }
}
