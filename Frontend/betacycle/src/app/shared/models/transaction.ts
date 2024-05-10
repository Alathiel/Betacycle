import { Product } from "./product";
import { User } from "./user";

export class Transaction
{
    userID: number = 0;
    productID: number = 0;
    transactionID: number = 0;
    quantity: number = 0;
    productPrice: number = 0;
    idPayment: number = 0;
    product: Product = new Product();
    user: User = new User();
}