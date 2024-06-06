import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductserviceService } from '../../../shared/services/productservice.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-viewer.component.html',
  styleUrl: './product-viewer.component.css'
})

export class ProductViewerComponent {
  @Input() products:any; 
  @Input() status:boolean = false; 
  constructor(private sanitizer:DomSanitizer, public router:Router, public service: ProductserviceService){}

  convert(buffer: any) {
    if (buffer != null)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + buffer);
    return ''
  }

  AddCart(product:Product, event:any){
    event.stopPropagation();
    this.service.AddToCart(product)
  }

  GoToDetails(productId:any){
    this.router.navigate(['productDetails'],{queryParams:{id:productId}});
  }
}
