import { Component } from '@angular/core';
import { HttpServicesService } from '../../shared/services/http-services.service';
import { Credentials } from '../../shared/models/credentials';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSlideToggleModule, MatButtonModule, MatFormFieldModule, MatInputModule],
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
        // localStorage.setItem('token1',)

        
          // const jsonString: string =`{"Authorization": "Basic ${window.btoa(this.credentials.email+':'+this.credentials.password)}"}`;
          // localStorage.setItem('header', JSON.stringify(jsonString));
      }
      else{
        console.log("login non riuscito: "+resp.status);
      }
      
    }
  );
  }
}
