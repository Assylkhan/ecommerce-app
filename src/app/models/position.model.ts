export class Position {
  cartId: string;
  orderId: string;
  itemId: string;
  quantity: number;

  public constructor(init?: Partial<Position>) {
      Object.assign(this, init);
  }
}
