import { Component, Injectable } from '@angular/core';
import { HttprequestservicesService } from './httprequestservices.service';
import { HttpStatusCode,HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { TOAST_STATE, ToastService } from './toast.service';
import { ToastComponent } from '../components/toast/toast.component';
import { delay, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * This service is used for the operation on product used by all user
 */
export class ProductserviceService {
  /**
   * @param products List with all the products get from db
   * @param carosel List of product showed on carousel
   * @param product Single product with all details
   * @param model Single model of the product
   * @param category Single category of the product
   * @param selectedValue Filter used for name
   * @param selectedColor Filter used for color
   * @param selectedPrice Filter used for price
   * @param selectedOperand Filter used for operand for price
   * @param totalProducts Total of products returned form the get calls
   * @param page Need to show products in sequence
   * @param loadedProducts Number of products
   * @param byname Input from the user to research by name
   * @param bycolor Input from the user to research by color
   * @param byprice Input from the user to reasearch by price
   * @param operand Input from the user that want to see products < or > of the price insert
   * @param cart Item cart used for CRUD operation on cart
   * @param categoryNavbar All the category used for research
   * @param quantity Quantity for cart
   */
  products: any;
  carosel: any;
  product:any;
  model: any;
  category: any;
  selectedValue = "productName";
  selectedColor = "color";
  selectedPrice = "price";
  selectedOperand = "operand";
  totalProducts = 0;
  page = 1;
  loadedProducts = 0;
  byname: string = '';
  byprice: number=0 ;
  bycolor: string = '';
  operand: string = '';
  cart: Cart = new Cart();
  categoryNavbar:any
  modelNavbar:any
  
  quantity = {"quantity" : 1};

  constructor(private http:HttprequestservicesService, private toast: ToastService) { }

  /**
     * Function for research a product with specific details, like name,color or price
  */
  FilterProduct()
  {
    
    this.page = 1;
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

  /** Function used to get all products from DB */
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
  
  /**Function used to get all the deals */
  getDeal() {
    this.http.GetHttpDeal().subscribe({
      next: (jsData: any) => {
        this.carosel = jsData.$values;
        console.log(this.carosel);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  /**Show the previous page */
  prev() {
    if (this.page > 1) {
      this.page--;
      this.filter();
    }
  }

  /**
   * Show the next page */
  next() {
    if (this.page < this.totalProducts / 10) {
      this.page++;
      this.filter();
    }
  }
  
  /** Show the product page by page */
  filter(temp:string = "aa"){
    if(temp === "bb")
      this.page = 1
    if(this.byname !== "" || this.bycolor != "" || this.byprice !== 0){
      this.http.getFilteredProductsUser(this.selectedValue, this.byname,
        this.selectedColor, this.bycolor,
        this.selectedPrice, this.byprice,
        this.selectedOperand, this.operand, this.page).subscribe({
        next: (response:any) => {
          this.products = response.body.products.$values
          this.totalProducts = response.body.totalProducts
          this.loadedProducts = this.products.length
          if(response.status == HttpStatusCode.NotFound)
            console.log('aa')
        },
        error: (error:HttpErrorResponse) => {
          if(error.status == 404)
            this.products = undefined
        }
      })
    }
    else
      this.getAllDatas()
  }

  /**Show the details of the single product */
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

  /**Add a product to the cart */
  AddToCart(prod: any)
  {
    this.cart.Product = prod;
    this.cart.Product.Model = {"name": ""}
    this.cart.Product.Category = {"name": ""}
    this.cart.productId = prod.productId;
    this.http.PostCart(this.cart).subscribe({
      next: (resp:any) =>{
        this.toast.showToast(TOAST_STATE.success, "Prodotto aggiunto con successo al carrello")
        timer(10)
        this.toast.dismissToast()
      },
      error: (err: any) => {
        this.toast.showToast(TOAST_STATE.error,"Fare l'accesso prima di aggiungere prodotti al carrello");
      }
    })
  }

  /**Get Categories to show in navbar */
  GetCategories()
  {
    this.http.getCategories().subscribe(
    {
      next: (data: any) => {
        this.categoryNavbar=data.$values
      },
      error: (err: any) => {
        console.log("Errore: " + err.status);
      }
    })
  }
}