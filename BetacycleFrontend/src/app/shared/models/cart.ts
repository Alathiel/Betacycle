import { Product } from "./product";

export class Cart
{
    userId: number = 0;
    productId: number = 0;
    quantity: number = 1;
    user = {
        "FirstName": "",
        "LastName": ""
    }
    Product: Product = new Product();
}