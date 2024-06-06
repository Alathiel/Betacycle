import { Component } from '@angular/core';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SingleOrderComponent } from './single-order/single-order.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,SingleOrderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders:any
  loaded=false

  constructor(private http:HttprequestservicesService,private token:AuthServiceService,private router:Router){
    if(!token.getLoginStatus() || !token.checkUser())
      {
        this.router.navigate(['login']);
      }
  }

  ngOnInit():void
  {
    this.http.GetOrders().subscribe(
      {
        next: (data: any) => {
          this.orders=data.$values
          console.log(this.orders)
          this.loaded=true
        },
        error: (error: any) => { console.log(error.message) }
      }
    )
  }

  SingleProducts(id:number)
  {
    this.http.GetProductDetails(id).subscribe()
  }
}
