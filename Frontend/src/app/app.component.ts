import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationbarComponent } from './app/core/navigationbar/navigationbar.component';
import { HomeComponent } from './app/features/home/home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavigationbarComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Betacycle';
}
