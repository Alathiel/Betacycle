import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CaroselloComponent } from './features/carosello/carosello.component';
import { ProductComponent } from './features/product/product.component';
import { FooterComponent } from './features/footer/footer.component';
import { LoginjwtComponent } from './core/loginjwt/loginjwt.component';
import { ProductCardComponent } from './features/ProductCard/product-card/product-card.component';
import { ContactComponent } from './features/contact/contact.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports:
  [
    RouterOutlet,
    NavbarComponent,
    NgbModule,
    CaroselloComponent,
    ProductComponent,
    FooterComponent,
    LoginjwtComponent,
    ProductCardComponent,
    ContactComponent,

  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corretto a styleUrls
})
export class AppComponent {
  title = 'betacycle';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Reindirizza alla home quando l'app viene avviata
    this.router.navigate(['/home']);
  }
}

