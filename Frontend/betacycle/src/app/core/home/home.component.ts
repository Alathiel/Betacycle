import { Component } from '@angular/core';
import { HttprequestService } from '../../shared/services/httprequest.service';
import { Credentials } from '../../shared/models/credentials';
import { HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product';
import { Model } from '../../shared/models/model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Product[] = [];
  models: Model [] = [];

  constructor(private http: HttprequestService)
  {
    this.http.GetProducts().subscribe
    ({
      next: (prod: any) => {
        this.products = prod.$values;

        //console.log(prod);
      },
      error: (err: any) => {
        console.log(err);
      }
    });

    this.http.GetModel().subscribe
    ({
      next: (mod: any) => {
        this.models = mod.$values;
        
        //console.log(mod.$values);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  PageSelector(page: number)
  {
    this.http.GetPageProducts(page).subscribe
    ({
      next: (prod: any) => {
        this.products = prod.$values;

        console.log(prod);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  GoToCart()
  {
    alert("Work in progress");
  }
}
