import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttprequestservicesService } from '../../../../shared/services/httprequestservices.service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../../shared/services/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpStatusCode, HttpErrorResponse } from '@angular/common/http';
import { ProductserviceService } from '../../../../shared/services/productservice.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})


export class ProductCardComponent {

  showOriginalCards: boolean = true;
  getname: string = '';
  getprice: number = 0;
  getcolor: string = '';
  products: any;
  selectedValue = "productName";
  selectedColor = "color";
  selectedPrice = "price";
  search = "";
  totalProducts = 0;
  page = 1;
  loadedProducts = 0;

  constructor(private http: HttprequestservicesService, private router: Router,
     public dialog: MatDialog, private toast: ToastService, private sanitizer: DomSanitizer, public service:ProductserviceService) 
  {
    // if(sessionStorage.getItem('tmpbyname') != '')
    //   {
    //     this.getname = sessionStorage.getItem('tmpbyname')!
    //   }
    // if(sessionStorage.getItem('tmpbyprice') != '')
    //   {
    //     this.getprice = parseFloat(sessionStorage.getItem('tmpbyprice')!);
    //   }
    // if(sessionStorage.getItem('tmpbycolor') != '')
    //   {
    //     this.getcolor = sessionStorage.getItem('tmpbycolor')!
    //   }
    //   console.log(sessionStorage.getItem('tmpbycolor'),sessionStorage.getItem('tmpbyname'),sessionStorage.getItem('tmpbyprice'))
    //   if(this.getname != '')
    //   {
        
        this.service.getAllDatas()
      
      // }
      // else
      // {
      //   this.getAllDatas()
      // }
     
  }

  SearchFilteredProduct()
  { 
    this.http.getFilteredProductsUser(this.selectedValue, this.getname,
      this.selectedColor, this.getcolor,
      this.selectedPrice, this.getprice, 1)
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

  checkValue(l: any): boolean {
    if ((typeof l.value === 'object' && !Array.isArray(l.value)) && (l.value === null || l.value !== null))
      return true
    return false;
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

  convert(buffer: any) {
    if (buffer != null)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + buffer);
    return ''
  }
 
  filter(temp:string = "aa"){
    if(temp === "bb")
      this.page = 1
    if(this.getname !== "" || this.getcolor != "" || this.getprice==0){
      this.http.getFilteredProductsUser(this.selectedValue, this.getname,
        this.selectedColor, this.getcolor,
        this.selectedPrice, this.getprice, this.page).subscribe({
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

  GoToDetailsPage(id: number) {
    sessionStorage.setItem('tmpprodid', id.toString());
    this.router.navigate(['productDetails']);
  }

  AddToCart() {
    alert("Work in progress");
  }
}


