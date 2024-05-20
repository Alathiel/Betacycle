import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent {
  
  @Input() product:any= ''; 
}
