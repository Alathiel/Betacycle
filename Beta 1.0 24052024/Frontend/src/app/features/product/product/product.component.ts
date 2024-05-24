import { Component } from '@angular/core';
import { NavbarProductComponent } from '../navbarProduct/navbar-product/navbar-product.component';
import { CaroselloComponent } from '../carosello/carosello/carosello.component';
import { ProductCardComponent } from '../productCard/product-card/product-card.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarProductComponent,CaroselloComponent,ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
