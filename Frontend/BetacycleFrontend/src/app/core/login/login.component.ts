import { Component } from '@angular/core';
import { HttpServicesService } from '../../shared/services/http-services.service';
import { Credentials } from '../../shared/models/credentials';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpStatusCode } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../../shared/services/Auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSlideToggleModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http:HttpServicesService, public router: Router, private AuthService:AuthService){
    if(AuthService.getLoggedStatus()){
      this.router.navigate(['home'])
    }
  }

  
  credentials: Credentials = new Credentials();
  disabled: boolean = false;
  stayConnected: boolean = false;
  newUser: User = new User();
  newCredentials: Credentials = new Credentials();

  login(){
    this.AuthService.Login(this.credentials).subscribe(resp => {
      // next: (response: any) => {
      //   console.log('in next: '+response)
      //   switch(response.status){
      //     case HttpStatusCode.Ok:
      //       console.log("login ok!!!")
      //       break;
      //     case HttpStatusCode.NoContent:
      //       console.log("nessun contenuto!!!")
      //       break;
          
      //   }
      // }
      // error: (error:any) => {
      //   console.log(error)
      // }
      if(resp.status == HttpStatusCode.Created || resp.status == HttpStatusCode.Ok){
        console.log("login ok");
        this.disabled = true;
        console.log(resp)
        console.log(resp.body);
        if(!this.stayConnected){
          sessionStorage.setItem('userId', window.btoa(resp.body));
          sessionStorage.setItem('token', window.btoa(`${this.credentials.email}:${this.credentials.password}`));
        }
        else{
          localStorage.setItem('userId', window.btoa(resp.body));
          localStorage.setItem('token', window.btoa(`${this.credentials.email}:${this.credentials.password}`));
        }
        
        this.router.navigate(['home'])

        
          // const jsonString: string =`{"Authorization": "Basic ${window.btoa(this.credentials.email+':'+this.credentials.password)}"}`;
          // localStorage.setItem('header', JSON.stringify(jsonString));
      }
      else{
        console.log("login non riuscito: "+resp.status);
      }
      
    });
  }

  loginJwt(){
    this.AuthService.LoginJWT(this.credentials).subscribe(resp => {
      console.log(resp)
      if(resp.status == HttpStatusCode.Ok){
        this.AuthService.setLoggedStatus(this.stayConnected, resp.body);
        this.router.navigate(['home'])
        // const jsonString: string =`{"Authorization": "Basic ${window.btoa(this.credentials.email+':'+this.credentials.password)}"}`;
        // localStorage.setItem('header', JSON.stringify(jsonString));
      }
      else{
        console.log("login non riuscito: "+resp.status);
      }
      
    })
  }

  register(){
    this.AuthService.registerUserData(this.newUser).subscribe({
      next: (jsData: any) => {
        console.log(jsData)
        this.newCredentials.userId = jsData.userId;
        this.AuthService.registerCredentials(this.newCredentials).subscribe({
          next: (jsData: any) =>{
            console.log(jsData)
          },
          error: (error) => {
            console.log(error)
            this.http.deleteUserData(this.newCredentials.userId).subscribe({
              next: (jsData: any) =>{
                console.log(jsData)
              },
              error: (error) => {}
            })
          }
          
        }) 
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
