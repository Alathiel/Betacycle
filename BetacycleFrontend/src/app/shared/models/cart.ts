/**Class For the cart
 * @param userId User id
 * @param productId Id of the product
 * @param quantity Quantity of the product insert
 * @param user Info of the user that will be added in post
 * @param Product The product information
 */

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