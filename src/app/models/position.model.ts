import { Item } from "./item.model";

export class Position {
  cartId: string;
  orderId: string;
  item: Item;
  quantity: number;

  public constructor(init?: Partial<Position>) {
      Object.assign(this, init);
  }
}
