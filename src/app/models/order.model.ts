export class Order {
  orderId: number;
  itemId: number;
  quantity: number;

  public constructor(init?: Partial<Order>) {
      Object.assign(this, init);
  }
}
