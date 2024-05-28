import { Component } from '@angular/core';
import { NavbarProductComponent } from '../navbarProduct/navbar-product/navbar-product.component';
import { CaroselloComponent } from '../carosello/carosello/carosello.component';
import { ProductCardComponent } from '../productCard/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FooterComponent } from '../../footer/footer/footer.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarProductComponent,CaroselloComponent,ProductCardComponent,CommonModule,FooterComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  showOriginalCards:boolean=true
  products:any
  page=1
  totalProducts=0
  loadedProducts=0
  constructor(private http: HttprequestservicesService, private router: Router, public dialog: MatDialog, private toast: ToastService,private sanitizer: DomSanitizer){

    
  }

  
}

