import { Component } from '@angular/core';
import { Product } from '../../shared/models/product';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { CommonModule } from '@angular/common';
import { FormsModule,NgForm } from '@angular/forms';
import { RouterModule,RouterLink,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterModule,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products:Product[]=[]
  constructor(private http:HttprequestservicesService )
  {
    this.http.GetProducts().subscribe
    ({
      next: (prod: any) => {
        this.products = prod.$values;

        //console.log(prod);
      },
      error: (err: any) => {
        console.log(err);
      }
    });   
  }
}
