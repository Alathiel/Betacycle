import { Component } from '@angular/core';
// import { HttprequestservicesService } from '../../shared/services/httprequest.service';
import { CommonModule } from '@angular/common';
import { CaroselloComponent } from '../carosello/carosello.component';
import { ProductCardComponent } from '../ProductCard/product-card/product-card.component';
import { NavbarFindProductComponent } from '../navbarFindProduct/navbar-find-product/navbar-find-product.component';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule , CaroselloComponent , ProductCardComponent ,NavbarFindProductComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  
productComponent : any;
showOriginalCards: boolean = true;

  // constructor(private http: HttprequestService) {
    // this.http.GetJwtAuhtors().subscribe({
    //   next: (authData: any) => {
    //     this.authors = authData;
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    // });
  }
  // showSearchMenu: boolean = false;

  // toggleSearchMenu() {
  //   this.showSearchMenu = !this.showSearchMenu;
  // }




  // FindAuthorByID(inpHtml: HTMLInputElement)
  // {
  //   this.http.GetAuhtorById(parseInt(inpHtml.value)).subscribe({
  //     next: (authData: any) => {
  //       this.authorById = authData;
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //   });
  // }

//   DeleteAuthorByID(inpHtml: HTMLInputElement)
//   {
//     this.http.DeleteAuhtorById(parseInt(inpHtml.value)).subscribe({
//       next: (authData: any) => {
//         //this.authorById = authData;
//       },
//       error: (err: any) => {
//         console.log(err);
//       },
//     });
//   }
//}
