import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products-viewer',
  standalone: true,
  imports: [MatCardModule, FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './products-viewer.component.html',
  styleUrl: './products-viewer.component.css'
})
export class ProductsViewerComponent {
  @Input() item:any ; // decorate the property with @Input()
  constructor(){}
  faCoffe = faCartPlus;
  items: any = ['red','green']
  
  

}
