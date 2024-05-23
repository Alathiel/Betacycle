// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
// import { HttprequestservicesService } from '../../shared/services/httprequest.service';
// import { Product } from '../../shared/models/Products';

// @Component({
//   selector: 'app-filtredproduct',
//   standalone: true,
//   imports: [FormsModule, CommonModule, MatPaginatorModule],
//   templateUrl: './filtredproduct.component.html',
//   styleUrl: './filtredproduct.component.css'
// })
// export class FiltredproductComponent {
//   currentPage: number = 0;
//   productname: string = '';
//   products: Product [] = [];
//   filteredproducts: Product [] = [];

//   constructor(private http: HttprequestservicesService)
//   {
//     this.productname = sessionStorage.getItem('tmpprod')!;
//     //sessionStorage.removeItem('tmpprod');
//     this.http.GetTotalFilteredProducts(this.productname).subscribe
//     ({
//       next: (prod: any) => {
//         this.products = prod.$values;
//         //console.log(prod);
//       },
//       error: (err: any) => {
//         console.log(err);
//       }
//     }); 
//   }

//   handlePageEvent(event: PageEvent)
//   {
//     console.log("handlePageEvent: " + event.pageIndex);
//     this.currentPage = event.pageIndex;
//     this.http.GetFilteredProduct(this.productname, this.currentPage+1, 10).subscribe
//       ({
//         next: (data: any) => {
//           this.filteredproducts = data.$values;
//           console.log(this.filteredproducts)
//         },
//         error: (err: any) => {
//           console.log("Errore: " + err.status);
//         }
//       })
//       sessionStorage.removeItem('tmpprod');
//   }
// }
