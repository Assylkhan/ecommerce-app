import { Cart } from "./cart.model";

export class User {
  _id?: any;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;

  billingInfo: {
    firstName?: string;
    lastName?: string;
    companyName?: string;
    country?: string;
    state?: string;
    city?: string;
    address?: string;
    zip?: string;
    phone?: string;
  }
  token?: string;
  cart?: Cart;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
