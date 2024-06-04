/**
 * CLass for the product
 * @param productName Name of the product
 * @param productId Id of the product
 * @param modelId Idmodel of the product
 * @param insertPrice Price when a new product is inserted
 * @param actualPrice Actual price of the product
 * @param description Description of the product
 * @param color Color of the product
 * @param weight Weight of the product
 * @param culture Language 
 * @param dateInsert Date when the product been insert
 * @param lastModify Date of the last modify on the product
 * @param Model Model base empty that will be filled in backend
 * @param Category Category base empty that will be filled in backed
 */
export class Product
{
    productName: string = '';
    productId: number = 0;
    modelId: number = 0;
    insertPrice: number = 0;
    actualPrice: number = 0;
    description: string = '';
    color: string = '';
    weight: string = '';
    culture: string = '';
    categoryID: number = 0;
    dateInsert: string='';
    lastModify: string='';
    Model = 
    {
        "name": ""
    }
    Category = 
    {
        "name": ""
    }
}