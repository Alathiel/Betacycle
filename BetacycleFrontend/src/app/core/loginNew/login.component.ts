import { Component, EventEmitter, Output } from '@angular/core';
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
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { Credentials } from '../../shared/models/credential';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSlideToggleModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterModule, MatCardModule, LoginFormComponent, RegisterFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  status:string = "login"
  constructor(private http:AuthServiceService, public router: Router){
    if(http.getLoginStatus()){
      this.router.navigate(['home'])
    }
  }
  changeForm(status:any) {
    this.status = status
    console.log(this.status)
  }
  @Output() newItemEvent = new EventEmitter<string>();
  credentials: Credentials = new Credentials();
  disabled: boolean = false;
  stayConnected: boolean = false;
  newUser: User = new User();
  newCredentials: Credentials = new Credentials();

  loginJwt(){
    this.http.LoginJWT(this.credentials).subscribe(resp => {
      console.log(resp)
      if(resp.status == HttpStatusCode.Ok){
        this.http.SetLoginStatus(this.stayConnected, resp.body);
        localStorage.setItem('userId', window.btoa(resp.body.userId));
        this.router.navigate(['home'])
        // const jsonString: string =`{"Authorization": "Basic ${window.btoa(this.credentials.email+':'+this.credentials.password)}"}`;
        // localStorage.setItem('header', JSON.stringify(jsonString));
      }
      else{
        console.log("login non riuscito: "+resp.status);
      }
      
    })
  }

  // register(){
  //   this.AuthService.registerUserData(this.newUser).subscribe({
  //     next: (jsData: any) => {
  //       console.log(jsData)
  //       this.newCredentials.userId = jsData.userId;
  //       this.AuthService.registerCredentials(this.newCredentials).subscribe({
  //         next: (jsData: any) =>{
  //           console.log(jsData)
  //         },
  //         error: (error) => {
  //           console.log(error)
  //           this.http.deleteUserData(this.newCredentials.userId).subscribe({
  //             next: (jsData: any) =>{
  //               console.log(jsData)
  //             },
  //             error: (error) => {}
  //           })
  //         }
          
  //       }) 
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }
}
