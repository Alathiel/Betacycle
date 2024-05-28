import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { Product } from '../../../shared/models/product';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  productID: number = 0;
  product: any;
  model: any;
  category: any;
  loaded= false;

  constructor(private http: HttprequestservicesService, private router: Router, private sanitizer: DomSanitizer)
  {
    if(sessionStorage.getItem('tmpprodid') === null) this.router.navigate(['product']);
    this.productID = parseInt(sessionStorage.getItem('tmpprodid')!);
    sessionStorage.removeItem('tmpprodid');
    this.GetDetails(this.productID);
    this.loaded = true;
  }

  GetDetails(id: number)
  {
    this.http.GetProductByID(id)
    .subscribe({
      next: (data:any) => {
        console.log(data);
        this.product = data;
        console.log(this.product);
        this.http.GetModelByID(this.product.modelId)
        .subscribe
        ({
          next: (modeldata: any) => {
            this.model = modeldata;
            console.log(this.model)
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
            console.log(this.category)
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

  convert(buffer:any) {
    if(buffer!=null)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+buffer);
    return ''
  }

  AddToCart()
  {
    alert("Work in progress");
  }

}
