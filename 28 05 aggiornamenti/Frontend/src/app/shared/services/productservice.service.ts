import { Injectable } from '@angular/core';
import { HttprequestservicesService } from './httprequestservices.service';
import { HttpStatusCode,HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  products: any;
  selectedValue = "productName";
  selectedColor = "color";
  selectedPrice = "price";
  search = "";
  totalProducts = 0;
  page = 1;
  loadedProducts = 0;
  byname: string = '';
  byprice: number=0 ;
  bycolor: string = '';

  constructor(private http:HttprequestservicesService) { }

  FilterProduct()
  {
    this.http.getFilteredProductsUser(this.selectedValue, this.byname,
      this.selectedColor, this.bycolor,
      this.selectedPrice, this.byprice, 1)
    .subscribe(
      {
        next: (data: any) => {
          this.products = data.body.products.$values;
          this.totalProducts = data.body.totalProducts
          this.loadedProducts = this.products.length
        },
        error: (err: any) => {
          console.log("Errore: " + err.status);
        }
      })
  }
  getAllDatas() {
    this.http.GetProducts(this.page).subscribe({
      next: (jsData: any) => {
        console.log(jsData);
        this.products = jsData.body.products.$values
        this.totalProducts = jsData.body.totalProducts
        this.loadedProducts = this.products.length
        
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  

  prev() {
    if (this.page > 1) {
      this.page--;
      this.filter();
    }
  }

  next() {
    if (this.page < this.totalProducts / 10) {
      this.page++;
      this.filter();
    }
  }
  
  filter(temp:string = "aa"){
    if(temp === "bb")
      this.page = 1
    if(this.byname !== "" || this.bycolor != "" || this.byprice==0){
      this.http.getFilteredProductsUser(this.selectedValue, this.byname,
        this.selectedColor, this.bycolor,
        this.selectedPrice, this.byprice, this.page).subscribe({
        next: (response:any) => {
          console.log(response)
          this.products = response.body.products.$values
          this.totalProducts = response.body.totalProducts
          this.loadedProducts = this.products.length
          if(response.status == HttpStatusCode.NotFound)
            console.log('aa')
        },
        error: (error:HttpErrorResponse) => {
          console.log(error)
          if(error.status == 404)
            this.products = undefined
        }
      })
    }
    else
      console.log("???");
  }
}
