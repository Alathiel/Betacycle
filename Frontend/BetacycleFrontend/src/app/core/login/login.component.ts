import { Component } from '@angular/core';
import { HttpServicesService } from '../../shared/services/http-services.service';
import { Credentials } from '../../shared/models/credentials';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http:HttpServicesService){
    if(sessionStorage.getItem('token') != null)
      alert("you're already logged in")
  }

  credentials: Credentials = new Credentials();
  disabled: boolean = false;
  stayConnected: boolean = false;

  login(){
    this.http.CheckCredentials(this.credentials).subscribe(resp => {
      console.log(resp)
      if(resp.status == HttpStatusCode.Ok){
        console.log("login ok");
        // this.disabled = true;
        console.log(resp.body.$values[0].userId);
        if(!this.stayConnected){
          sessionStorage.setItem('userId', window.btoa(resp.body.$values[0].userId));
          sessionStorage.setItem('token', window.btoa(`${this.credentials.email}:${this.credentials.password}`));
        }
        else{
          localStorage.setItem('userId', window.btoa(resp.body.$values[0].userId));
          localStorage.setItem('token', window.btoa(`${this.credentials.email}:${this.credentials.password}`));
        }
      }
      else{
        console.log("login non riuscito: "+resp.status);
      }
      
    }
  );
  }
}
