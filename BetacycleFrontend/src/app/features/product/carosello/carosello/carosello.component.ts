import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttprequestservicesService } from '../../../../shared/services/httprequestservices.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../../shared/services/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpStatusCode, HttpErrorResponse } from '@angular/common/http';
import { ProductserviceService } from '../../../../shared/services/productservice.service';

@Component({
  selector: 'app-carosello',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carosello.component.html',
  styleUrl: './carosello.component.css'
})
export class CaroselloComponent {
  
  /**Carousel for special price */
  constructor(private http: HttprequestservicesService, private router: Router, public dialog: MatDialog, private toast: ToastService, private sanitizer: DomSanitizer,
    public service: ProductserviceService
  ) {
    this.service.getDeal();
  }
  
  /**These are two function for show image from db */
  checkValue(l: any): boolean {
    if ((typeof l.value === 'object' && !Array.isArray(l.value)) && (l.value === null || l.value !== null))
      return true
    return false;
  }

  convert(buffer: any) {
    if (buffer != null)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + buffer);
    return ''
  }
    /**
   * GO to the page of the specific product you click
   * @param id Id product to get all details
   */
  GoToDetailsPage(id: number)
  {
    this.router.navigate(['productDetails'],{queryParams:{id:id}});
  }

}
