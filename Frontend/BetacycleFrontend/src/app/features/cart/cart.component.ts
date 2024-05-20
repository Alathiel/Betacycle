import { Component, Input } from '@angular/core';
import { ProductSectionComponent } from './product-section/product-section.component';
import { CommonModule } from '@angular/common';
import { NoAuthCalls } from '../../shared/services/noAuth-calls.service';
import { AuthCalls } from '../../shared/services/auth-calls.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductSectionComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent {
  cart:any;
  constructor(private http: AuthCalls){
    http.getCart().subscribe({
      next:(resp:any) =>{
        console.log(resp)
        this.cart = resp;
      },
      error:(error:any) =>{

      }
    })
  }

}
