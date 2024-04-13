import { Component } from '@angular/core';
import { HttpServicesService } from '../../shared/services/http-services.service';
import { Credentials } from '../../shared/models/credentials';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http:HttpServicesService){}
  credentials: Credentials = new Credentials();

  login(){
    this.http.CheckCredentials(this.credentials).subscribe({
      next: (jsData: any) => {
      }, 
      error: (error:any) => {
        console.log(error)
      }
    });
  }
}
