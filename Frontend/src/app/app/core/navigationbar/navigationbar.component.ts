import { Component } from '@angular/core';
import { HomeComponent } from '../../features/home/home.component';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RegistrationComponent } from '../../features/account/registration/registration.component';

@Component({
  selector: 'app-navigationbar',
  standalone: true,
  imports: [RouterLink,RouterOutlet,HomeComponent, RegistrationComponent],
  templateUrl: './navigationbar.component.html',
  styleUrl: './navigationbar.component.css'
})
export class NavigationbarComponent {

}
