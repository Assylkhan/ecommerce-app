import { Position } from "./position.model";

export class Order {
  orderId: number;
  positions?: Position[];
  shipping: string;
  sum: number;

  public constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}
