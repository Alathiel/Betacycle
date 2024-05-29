import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { Product } from '../../../shared/models/product';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FooterComponent } from '../../footer/footer/footer.component';
import { ProductserviceService } from '../../../shared/services/productservice.service';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule,FooterComponent],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent {

  productID: number = 0;
  product: any;
  model: any;
  category: any;
  loaded= false;

  constructor(private http: HttprequestservicesService, private router: Router, private sanitizer: DomSanitizer, public service:ProductserviceService)
  {
    
    this.loaded = true;
  }

  convert(buffer:any) {
    if(buffer!=null)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+buffer);
    return ''
  }

  AddToCart()
  {
    
  }
}
