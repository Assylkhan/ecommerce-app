export class Billing {
  _id: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zip: string;
  phone: string;

  public constructor(init?: Partial<Billing>) {
    Object.assign(this, init);
  }
}
