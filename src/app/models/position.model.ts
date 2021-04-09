import { Item } from "./item.model";

export class Position {
  _id: string;
  cartId: string;
  orderId: string;
  itemId: string;
  item: Item;
  quantity: number;

  public constructor(init?: Partial<Position>) {
      Object.assign(this, init);
  }
}
