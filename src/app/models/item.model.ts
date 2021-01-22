export class Item {
  _id: number;
  name: string;
  realPrice: number;
  price: number;
  description: string;
  longDescription: string;
  count: string;
  imageUrl: string;
  imageFileName: string;

  public constructor(init?: Partial<Item>) {
      Object.assign(this, init);
  }
}
