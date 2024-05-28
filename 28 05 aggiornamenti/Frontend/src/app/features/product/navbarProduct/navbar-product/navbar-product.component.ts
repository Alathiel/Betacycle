import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { ProductCardComponent } from '../../productCard/product-card/product-card.component';
import { Product } from '../../../../shared/models/product';
import { ProductserviceService } from '../../../../shared/services/productservice.service';
import { HttprequestservicesService } from '../../../../shared/services/httprequestservices.service';

@Component({
  selector: 'app-navbar-product',
  standalone: true,
  imports: [CommonModule,FormsModule,MatCardModule,ProductCardComponent],
  templateUrl: './navbar-product.component.html',
  styleUrl: './navbar-product.component.css'
})
export class NavbarProductComponent {

  constructor(public service:ProductserviceService,private http:HttprequestservicesService)
  {}

  Azzera()
  {
    this.service.byname=''
    this.service.bycolor=''
    this.service.byprice=0
  }
}
