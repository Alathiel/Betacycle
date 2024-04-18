import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpServicesService } from './shared/services/http-services.service';
import { Credentials } from './shared/models/credentials';
import { HttpStatusCode } from '@angular/common/http';
import { LoginComponent } from './core/login/login.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { RegistrationComponent } from './core/registration/registration.component';
import { HomeComponent } from './features/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, LoginComponent, NavbarComponent, RegistrationComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private http:HttpServicesService){}

  credentials: Credentials = new Credentials()

  login(){
    //sessionStorage.setItem("credentials",this.credentials.email.concat(":"+this.credentials.password));
    this.http.CheckCredentials(this.credentials).subscribe(resp => {
      console.log(resp)
      if(resp.status == HttpStatusCode.Ok){
        console.log("login ok");
        localStorage.setItem('token', window.btoa(this.credentials.email+":"+this.credentials.password));
      }
      else{
        console.log("login non riuscito: "+resp.status);
      }
    });
  }

  title = 'BetacycleFrontend';
}
