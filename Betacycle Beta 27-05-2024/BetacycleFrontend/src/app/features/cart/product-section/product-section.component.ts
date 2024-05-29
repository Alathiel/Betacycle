import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent {
  constructor(private sanitizer: DomSanitizer, private http:HttprequestservicesService){}
  
  @Input() product:any= ''; 
  @Output() reloadPriceEvent = new EventEmitter<string>();

  Convert(buffer:any) {
    if(buffer!=null)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+buffer);
    return ''
  }

  LessQuantity(){
    this.product.quantity -= 1;
    this.product.user = {
      "FirstName": "",
      "LastName": ""
    }
    this.product.product.model = {
      "name": ""
    }
    this.product.product.category = {
      "name": ""
    }
    this.http.PutCart(this.product).subscribe({
      next: (resp:any) =>{
        this.reloadPriceEvent.emit("-");
      }
    })
  }

  MoreQuantity(){
    this.product.quantity += 1;
    this.product.user = {
      "FirstName": "",
      "LastName": ""
    }
    this.product.product.model = {
      "name": ""
    }
    this.product.product.category = {
      "name": ""
    }
    this.http.PutCart(this.product).subscribe({
      next: (resp:any) =>{
        this.reloadPriceEvent.emit("+");

      }
    })
  }
}
