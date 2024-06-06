import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { ProductserviceService } from '../../../shared/services/productservice.service';

@Component({
  selector: 'app-single-order',
  standalone: true,
  imports: [],
  templateUrl: './single-order.component.html',
  styleUrl: './single-order.component.css'
})
export class SingleOrderComponent {

  constructor(private router:Router,private sanitizer:DomSanitizer,private http:HttprequestservicesService,public service:ProductserviceService)
  {
  }

  @Input() product:any='';

  Convert(buffer:any) {
    if(buffer!=null)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+buffer);
    return ''
  }

  GoToDetailsPage(id: number) {
    this.router.navigate(['productDetails'],{queryParams:{id:id}});
  }
}
