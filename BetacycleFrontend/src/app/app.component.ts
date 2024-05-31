import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './features/footer/footer/footer.component';
import { Router } from '@angular/router';
import { HomeComponent } from "./features/home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent, FooterComponent, HomeComponent, NavbarComponent]
})
export class AppComponent {
  title = 'BETACYCLE';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Reindirizza alla home quando l'app viene avviata
  }
}
