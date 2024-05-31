import { Component } from '@angular/core';
import { Product } from '../../shared/models/product';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { CommonModule } from '@angular/common';
import { FormsModule,NgForm } from '@angular/forms';
import { RouterModule,RouterLink,RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer/footer.component';
import { ProductserviceService } from '../../shared/services/productservice.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterModule,RouterOutlet,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products:Product[]=[]
  constructor(private http:HttprequestservicesService, public service: ProductserviceService)
  {
    this.service.operand = '>';
    this.service.byprice = 0;
    this.service.page = 1;
  }
}
