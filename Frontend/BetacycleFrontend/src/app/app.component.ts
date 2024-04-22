import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpServicesService } from './shared/services/http-services.service';
import { Credentials } from './shared/models/credentials';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpStatusCode } from '@angular/common/http';
import { LoginComponent } from './core/login/login.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, MatSlideToggleModule, MatButtonModule, MatFormFieldModule, MatInputModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private http:HttpServicesService){}

  credentials: Credentials = new Credentials()

 
  title = 'BetacycleFrontend';
}
