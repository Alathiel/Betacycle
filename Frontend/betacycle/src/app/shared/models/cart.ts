import { Product } from "./product";
import { User } from "./user";

export class Cart
{
    userID: number = 0;
    productID: number = 0;
    quantity: number = 0;
    product: Product = new Product();
    user: User = new User();
}