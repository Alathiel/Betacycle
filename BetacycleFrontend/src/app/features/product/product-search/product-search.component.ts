import { Component } from '@angular/core';
import { NavbarProductComponent } from "../navbarProduct/navbar-product/navbar-product.component";
import { ProductViewerComponent } from "../product-viewer/product-viewer.component";
import { ProductserviceService } from '../../../shared/services/productservice.service';

@Component({
    selector: 'app-product-search',
    standalone: true,
    templateUrl: './product-search.component.html',
    styleUrl: './product-search.component.css',
    imports: [NavbarProductComponent, ProductViewerComponent]
})
export class ProductSearchComponent {
  constructor(public service:ProductserviceService){
    if(this.service.products == undefined || this.service.products.length <= 0)
      this.service.getAllDatas()
  }
}
