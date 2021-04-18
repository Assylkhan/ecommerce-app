export class Shipping {
  _id: string;
  name: string;
  sum: number;

  public constructor(init?: Partial<Shipping>) {
    Object.assign(this, init);
  }
}
