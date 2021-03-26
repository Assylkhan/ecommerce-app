export class Cart {
  _id?: any;
  userId?: string;

  public constructor(init?: Partial<Cart>) {
    Object.assign(this, init);
  }
}
