import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.css'
})
export class ConfirmOrderComponent {
  constructor(private http:HttprequestservicesService){}
  loaded = false;
  totalPrice:number = 0;
  cart:any;
  orderCompleted = false;

  ngOnInit()
  {
    this.http.GetCart().subscribe({
      next:(resp:any) =>{
        this.cart = resp.body;
        console.log(this.cart)
        this.cart.forEach((product:any) => {
          this.totalPrice += product.quantity * product.product.actualPrice
        });
        this.loaded = true;
      },
    })
  }

  completeOrder(){
    
  }
}
