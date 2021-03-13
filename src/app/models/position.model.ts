export class Position {
  cartId: number;
  orderId: number;
  itemId: number;
  quantity: number;

  public constructor(init?: Partial<Position>) {
      Object.assign(this, init);
  }
}
