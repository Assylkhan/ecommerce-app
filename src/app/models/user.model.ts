export class User {
    id?: any;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;

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

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
