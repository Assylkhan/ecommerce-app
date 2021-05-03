export class Shipping {
  _id: string;
  name: string;
  sum: number;
  country: string;
  state: string;
  city: string;
  address: string;
  zip: string;
  phone: string;

  public constructor(init?: Partial<Shipping>) {
    Object.assign(this, init);
  }
}
