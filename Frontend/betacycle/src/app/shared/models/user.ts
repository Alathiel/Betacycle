import { Address } from "./address";
import { Cart } from "./cart";
import { Transaction } from "./transaction";

export class User
{
    userId: number = 0;
    firstName: string = '';
    lastName: string = '';
    birthDate: string = '';
    phone: string = '';
    security: number = 0;
    //transactions: Transaction [] = [];
    //addresses: Address [] = [];
    //carts: Cart [] = [];
}