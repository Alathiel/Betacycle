import { FormatWidth, getLocaleDateTimeFormat } from "@angular/common"
import { LOCALE_ID } from "@angular/core"

export class Product{
    ProductID: number = 0
    ModelId: number = 0
    InsertPrice: number = 0
    ActualPrice: number = 0
    Description: string = ""
    Color: string = ""
    Weight: number = 0
    Culture: string = ""
    CategoryID: number = 0
    DateInsert: string = getLocaleDateTimeFormat(LOCALE_ID.toString(), FormatWidth.Short)
    LastModify: string = getLocaleDateTimeFormat(LOCALE_ID.toString(), FormatWidth.Short)
}