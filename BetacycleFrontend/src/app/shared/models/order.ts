import { Product } from "./product"

export class Order{
        userId:number = 0
        productId:number = 0
        quantity:number = 0
        productPrice:number = 0
        idPayment:number = 0
        status: string = "Storage"
        transactionId:number = 0
        orderId:number = 0
        addressId: number = 0
        transaction = {}
        product:Product = new Product()
        date:string = '2024-01-01'
}