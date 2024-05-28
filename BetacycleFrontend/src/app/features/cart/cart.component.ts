import { Component, Input } from '@angular/core';
import { ProductSectionComponent } from './product-section/product-section.component';
import { CommonModule } from '@angular/common';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductSectionComponent, CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent {
  cart:any;
  totalPrice:number = 0;
  loaded = false;
  constructor(private http: HttprequestservicesService, private router: Router){}

  ngOnInit(): void {
    this.http.GetCart().subscribe({
      next:(resp:any) =>{
        this.cart = resp.body;
        this.cart.forEach((product:any) => {
          this.totalPrice += product.quantity * product.product.actualPrice
        });
        this.loaded = true;
      },
      error:(error:any) =>{
      }
    })
  }

  ReloadTotalPrice(newItem: any) {
    this.totalPrice = 0
    this.cart.forEach((product:any) => {
      this.totalPrice += product.quantity * product.product.actualPrice
    });
  }

  redirect(url:string){
    this.router.navigate([url]);
  }

}
