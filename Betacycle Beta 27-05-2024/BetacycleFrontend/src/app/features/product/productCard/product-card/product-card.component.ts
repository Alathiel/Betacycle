import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Product } from '../../../../shared/models/product';
import { HttprequestservicesService } from '../../../../shared/services/httprequestservices.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})


export class ProductCardComponent {

showOriginalCards : boolean = true;
getname: string = '';
getprice: number = 0;
getcolor: string = '';
getoperand: string = '';
products: any;
selectedValue = "productName";
selectedColor = "color";
selectedPrice = "price";
selectedOperand = "operand";
search = "";
totalProducts = 0;
page = 1;
loadedProducts = 0;

constructor(private http:HttprequestservicesService, private sanitizer: DomSanitizer, private router:Router)
{
    if(sessionStorage.getItem('tmpbyname') != '')
      {
        this.getname = sessionStorage.getItem('tmpbyname')!
        //sessionStorage.removeItem('tmpbyname');
      }
    if(sessionStorage.getItem('tmpbyprice') != '')
      {
        this.getprice = parseFloat(sessionStorage.getItem('tmpbyprice')!);
        //sessionStorage.removeItem('tmpbyprice') 
      }
    if(sessionStorage.getItem('tmpbycolor') != '')
      {
        this.getcolor = sessionStorage.getItem('tmpbycolor')!
        //sessionStorage.removeItem('tmpbycolor');
      }
    if(sessionStorage.getItem('tmpop') != '')
      {
        this.getoperand = sessionStorage.getItem('tmpop')!
        //sessionStorage.removeItem('tmpop');
      }
      this.SearchFilteredProduct();
}

SearchFilteredProduct()
  { 
    this.http.getFilteredProductsUser(this.selectedValue, this.getname,
      this.selectedColor, this.getcolor,
      this.selectedPrice, this.getprice, 
      this.selectedOperand, this.getoperand, 1)
    .subscribe(
      {
        next: (data: any) => {
          console.log(data)
          this.products = data.body.products.$values;
          this.totalProducts = data.body.totalProducts
          this.loadedProducts = this.products.length
        },
        error: (err: any) => {
          console.log("Errore: " + err.status);
        }
      })
  }

  checkValue(l:any): boolean{
    if((typeof l.value === 'object' && !Array.isArray(l.value)) && (l.value === null || l.value !== null))
      return true
    return false;
  }

  convert(buffer:any) {
    if(buffer!=null)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+buffer);
    return ''
  }

  prev(){
    if(this.page > 1)
    {
      this.page--;
      this.filter();
    }
  }

  next(){
    if(this.page < this.totalProducts/10)
    {
      this.page++;
      this.filter();
    }
  }

  filter(temp:string = "aa"){
    if(temp === "bb")
      this.page = 1
    if(this.getname !== "" || this.getcolor != ""){
      this.http.getFilteredProductsUser(this.selectedValue, this.getname,
        this.selectedColor, this.getcolor,
        this.selectedPrice, this.getprice,
        this.selectedOperand, this.getoperand, this.page).subscribe({
        next: (response:any) => {
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
      //this.getAllDatas()
      console.log("???");
  }

  getAllDatas(){
    this.http.GetProducts(this.page)
    .subscribe({
      next: (jsData:any) => {
        console.log(jsData);
        this.products = jsData.body.products.$values
        this.totalProducts = jsData.body.totalProducts
        this.loadedProducts = this.products.length
      },
      error: (error:any) => {
        console.log(error);
      }
    })
  }

  GoToDetailsPage(id: number)
  {
    sessionStorage.setItem('tmpprodid', id.toString());
    this.router.navigate(['productDetails']);
  }

  AddToCart()
  {
    alert("Work in progress");
  }
}
