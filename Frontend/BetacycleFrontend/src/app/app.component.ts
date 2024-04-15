import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpServicesService } from './shared/services/http-services.service';
import { Credentials } from './shared/models/credentials';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private http:HttpServicesService){}

  credentials: Credentials = new Credentials()

  login(){
    console.log(this.credentials.email)
    this.http.CheckCredentials(this.credentials).subscribe({
      next: (jsData: any) => {
        console.log(jsData)
      }, 
      error: (error:any) => {
        console.log(error)
      }
    });
  }

  title = 'BetacycleFrontend';
}
