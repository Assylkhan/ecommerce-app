export class User {
    id?: any;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    zip?: string;
    authData?: string;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
