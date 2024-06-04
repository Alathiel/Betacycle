import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttprequestservicesService } from '../../../../shared/services/httprequestservices.service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../../shared/services/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpStatusCode, HttpErrorResponse } from '@angular/common/http';
import { ProductserviceService } from '../../../../shared/services/productservice.service';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { CaroselloComponent } from '../../carosello/carosello/carosello.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, ToastComponent,CaroselloComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})


export class ProductCardComponent {

  showOriginalCards: boolean = true;
  getname: string = '';
  getprice: number = 0;
  getcolor: string = '';
  getoperand: string = '';
  products: any;
  selectedValue = "productName";
  selectedColor = "color";
  selectedPrice = "price";
  selectedOperand = "operand";
  search = "";
  totalProducts = 0;
  page = 1;
  loadedProducts = 0;
  

  constructor(private http: HttprequestservicesService, private router: Router,
     public dialog: MatDialog, private toast: ToastService, private sanitizer: DomSanitizer, public service:ProductserviceService) 
  {
    if(this.service.byname != '')
      {
        this.service.page = 1;
        this.service.filter();
      }
    else 
    {
      this.service.filter();
      this.service.getAllDatas();
    }
  }

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

  GoToDetailsPage(id: number) {
    //sessionStorage.setItem('tmpprodid', id.toString());
    //this.service.GetDetails(id);
    this.router.navigate(['productDetails'],{queryParams:{id:id}});
  }

  ColorText(colore:string)
  {
    return 'color:'+colore
  }
}


