import { Position } from "./position.model";
import { Shipping } from "./shipping.model";

export class Order {
  orderId: number;
  positions?: Position[];
  shipping: Shipping;
  sum: number;

  public constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}
