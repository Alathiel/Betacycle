import { Injectable } from '@angular/core';
import { HttprequestservicesService } from './httprequestservices.service';
import { HttpStatusCode,HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  products: any;
  product:any;
  prodtocart: any;
  model: any;
  category: any;
  selectedValue = "productName";
  selectedColor = "color";
  selectedPrice = "price";
  selectedOperand = "operand";
  search = "";
  totalProducts = 0;
  page = 1;
  loadedProducts = 0;
  byname: string = '';
  byprice: number=0 ;
  bycolor: string = '';
  operand: string = '';
  cart: Cart = new Cart();

  quantity = {"quantity" : 1};

  constructor(private http:HttprequestservicesService) { }

  FilterProduct()
  {
    this.http.getFilteredProductsUser(this.selectedValue, this.byname,
      this.selectedColor, this.bycolor,
      this.selectedPrice, this.byprice,
      this.selectedOperand, this.operand, 1)
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
        this.selectedPrice, this.byprice,
        this.selectedOperand, this.operand, this.page).subscribe({
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

  GetDetails(id: number)
  {
    this.http.GetProductByID(id)
    .subscribe({
      next: (data:any) => {
        this.product = data;
        this.http.GetModelByID(this.product.modelId)
        .subscribe
        ({
          next: (modeldata: any) => {
            this.model = modeldata;
          },
          error: (err:any) => {
            console.log(err.message);
          }
        })
        this.http.GetCategoryByID(this.product.categoryId)
        .subscribe
        ({
          next: (categorydata: any) => {
            this.category = categorydata;
          },
          error: (err:any) => {
            console.log(err.message);
          }
        })
      },
      error: (error:any) => {
        console.log(error);
      }
    })
  }

  AddToCart(prod: any)
  {
    prod.quantity = 1
    this.prodtocart = {"Product" : prod}
    this.prodtocart.user = {
      "FirstName": "",
      "LastName": ""
    }
    this.prodtocart.Product.Model = {
      "name": ""
    }
    this.prodtocart.Product.Category = {
      "name": ""
    }
    this.http.PostCart(this.prodtocart).subscribe({
      next: (resp:any) =>{
        //this.reloadPriceEvent.emit("-");
        alert(resp)
      },
      error: (err: any) => {
        alert(err.message + " ||| " + JSON.stringify(this.prodtocart));
      }
    })
  }

  AddToCartFromCards(prod: Product)
  {
    this.cart.Product = prod;
    this.cart.Product.Model = {"name": ""}
    this.cart.Product.Category = {"name": ""}
    this.cart.productId = prod.productId;
    /*prod.Quantity = 1
    prod.user = {
      "FirstName": "",
      "LastName": ""
    }
    prod.Product.Model = {
      "name": ""
    };
    prod.Product.Category = {
      "name": ""
    }*/
    //this.prodtocart = {"Product" : prod}
    /*this.prodtocart.user = {
      "FirstName": "",
      "LastName": ""
    }*/
    /*this.prodtocart.Product.Model = {
      "name": ""
    }*/
    /*this.prodtocart.Product.Category = {
      "name": ""
    }*/
    this.http.PostCart(this.cart).subscribe({
      next: (resp:any) =>{
        //this.reloadPriceEvent.emit("-");
        alert(resp)
      },
      error: (err: any) => {
        alert(err.message + " ||| " + JSON.stringify(prod));
      }
    })
  }
}