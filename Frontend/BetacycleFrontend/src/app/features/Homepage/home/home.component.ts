import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServicesService } from '../../../shared/services/http-services.service';
import { Product } from '../../../shared/models/product';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ProductsViewerComponent } from '../../../core/products-viewer/products-viewer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsViewerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  constructor(private router: Router, private http: HttpServicesService){

    if(sessionStorage.getItem('token') === null && localStorage.getItem('token') === null){
      alert("Devi prima eseguire il login!!!!");
      this.router.navigate(['login'])
    }
    this.http.getProducts().subscribe({
      next: (JsData: any) => {
        console.log(JsData)
        this.products = JsData.$values
      },
      error: (error) => {
        console.log
      }
    })
    this.getCategories();
  }
  products: any = []
  categories: any;
  selectedValue: string = 'all';
 
  
  logout(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate(['login'])
  }

  getCategories(){
    this.http.getCategories().subscribe({
      next: (JsData:any) => {
        this.categories = JsData.$values;
        console.log(JsData.$values)
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  redirectSettings(){
    this.router.navigate(['settings'])
  }
  

}
