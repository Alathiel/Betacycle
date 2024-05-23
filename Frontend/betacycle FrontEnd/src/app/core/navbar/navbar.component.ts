import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ContactComponent } from '../../features/contact/contact.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule, ContactComponent ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  
newRoot : Router = new Router();
[x: string]: any;
  constructor(public authStatus: AuthService){}
 
}
