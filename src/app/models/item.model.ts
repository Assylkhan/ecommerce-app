export class Item {
  _id: string;
  name: string;
  realPrice: number;
  price: number;
  description: string;
  longDescription: string;
  featured: boolean;
  count: string;
  imageUrls: string[] = [];
  shippingOptions: ItemShipping[];

  public constructor(init?: Partial<Item>) {
      Object.assign(this, init);
  }
}

interface ItemShipping {
  shipsFrom: ShippingPlace[];
  canShipTo: ShippingPlace[];
  estimatedDeliveryDays: number;
  shippingCost: number;
}

interface ShippingPlace {
  country: string;
  city: string;
}
