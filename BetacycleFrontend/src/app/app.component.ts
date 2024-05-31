import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './features/footer/footer/footer.component';
import { Router } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,FooterComponent,ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BETACYCLE';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Reindirizza alla home quando l'app viene avviata
  }
}
