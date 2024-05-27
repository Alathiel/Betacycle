import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-navbar-product',
  standalone: true,
  imports: [CommonModule,FormsModule,MatCardModule],
  templateUrl: './navbar-product.component.html',
  styleUrl: './navbar-product.component.css'
})
export class NavbarProductComponent {

  byname: string = '';
  byprice: string = '';
  bycolor: string = '';

  SetFilteredProduct()
  {
    sessionStorage.setItem('tmpbyname', this.byname);
    sessionStorage.setItem('tmpbyprice', this.byprice);
    sessionStorage.setItem('tmpbycolor', this.bycolor);
    window.location.reload();
  }


}
