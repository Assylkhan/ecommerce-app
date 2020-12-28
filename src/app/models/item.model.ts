export class Item {
  name: string;
  realPrice: number;
  price: number;
  description: string;
  count: string;
  imageUrl: string;
  imageFileName: string;

  public constructor(init?: Partial<Item>) {
      Object.assign(this, init);
  }
}