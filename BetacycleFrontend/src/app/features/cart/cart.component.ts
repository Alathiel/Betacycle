import { Component, Input } from '@angular/core';
import { ProductSectionComponent } from './product-section/product-section.component';
import { CommonModule } from '@angular/common';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../shared/services/auth-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductSectionComponent, CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

/**General management of cart functions  */

export class CartComponent {
  cart:any;
  totalPrice:number = 0;
  loaded = false;

  constructor(private http: HttprequestservicesService, private router: Router, token: AuthServiceService){
    /**Only if you are logged in you can see the cart, no for no user registred */
    if(!token.getLoginStatus() || !token.checkUser())
      this.router.navigate(['login']);
  }

  /**Showing the cart at page loading */
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

  /**Funcion to reload the total price if you add or remove item from the cart*/
  ReloadTotalPrice() {
    this.totalPrice = 0
    this.cart.forEach((product:any) => {
      this.totalPrice += product.quantity * product.product.actualPrice
    });
  }

  redirect(url:string){
    this.router.navigate([url]);
  }

}
