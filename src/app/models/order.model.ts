import { Billing } from "./billing.model";
import { Position } from "./position.model";
import { Shipping } from "./shipping.model";

export class Order {
  orderId: number;
  positions?: Position[];
  shipping: Shipping;
  billing: Billing;
  firstName: string;
  lastName: string;
  email: string;
  sum: number;

  public constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}
