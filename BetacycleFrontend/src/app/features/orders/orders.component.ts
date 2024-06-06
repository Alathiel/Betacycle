import { Component } from '@angular/core';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  constructor(http:HttprequestservicesService){
    http.GetOrders().subscribe({

    })
  }
}
