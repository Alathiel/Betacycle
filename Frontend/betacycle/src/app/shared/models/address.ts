import { User } from "./user";

export class Address
{
    userId: number = 0;
    city: string = '';
    address: string = '';
    cap: string = '';
    province: string = '';
    nation: string = '';
    addressID: number = 0;
    user: User = new User();
}