/**
 * Class used when need to insert a new address
 * Same as address but has user information
 */
export class AddressPost
{
    userId: number = 0;
    city: string = '';
    address1: string = '';
    cap: string = '';
    province: string = '';
    nation: string = '';
    addressId: number = 0;
    user: user = new user();
}

export class user{
    firstName: string = '';
    lastName: string = '';
}