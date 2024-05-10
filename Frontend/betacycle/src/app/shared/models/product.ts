import { Model } from "./model";

export class Product
{
    nameProduct: string = '';
    modelId: number = 0;
    insertPrice: number = 0;
    actualPrice: number = 0;
    description: string = '';
    color: string = '';
    weight: string = '';
    culture: string = '';
    categoryID: number = 0;
    dateInsert: Date = new Date();
    lastModify: Date = new Date();
    model: Model = new Model();
}