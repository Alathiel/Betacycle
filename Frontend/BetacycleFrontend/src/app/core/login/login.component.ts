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
import { User } from '../../shared/models/user';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSlideToggleModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http:HttpServicesService, public router: Router){
    if(sessionStorage.getItem('token') != null){
      this.disabled = false;
      this.router.navigate(['home'])
    }
    else if(localStorage.getItem('token') != null){
      this.disabled = false;
      this.router.navigate(['home'])
    }
  }

  credentials: Credentials = new Credentials();
  disabled: boolean = false;
  stayConnected: boolean = false;
  newUser: User = new User();
  newCredentials: Credentials = new Credentials();

  login(){
    this.http.CheckCredentials(this.credentials).subscribe(resp => {
      next: (response: any) => {
        console.log('in next: '+response)
        switch(response.status){
          case HttpStatusCode.Ok:
            console.log("login ok!!!")
            break;
          case HttpStatusCode.NoContent:
            console.log("nessun contenuto!!!")
            break;
          
        }
      }
      error: (error:any) => {
        console.log(error)
      }
      console.log(resp)
      if(resp.status == HttpStatusCode.Created){
        console.log("login ok");
        this.disabled = true;
        console.log(resp.body.$values[0].userId);
        if(!this.stayConnected){
          sessionStorage.setItem('userId', window.btoa(resp.body.$values[0].userId));
          sessionStorage.setItem('token', window.btoa(`${this.credentials.email}:${this.credentials.password}`));
        }
        else{
          localStorage.setItem('userId', window.btoa(resp.body.$values[0].userId));
          localStorage.setItem('token', window.btoa(`${this.credentials.email}:${this.credentials.password}`));
        }

        this.router.navigate(['home'])
        // localStorage.setItem('token1',)

        
          // const jsonString: string =`{"Authorization": "Basic ${window.btoa(this.credentials.email+':'+this.credentials.password)}"}`;
          // localStorage.setItem('header', JSON.stringify(jsonString));
      }
      else{
        console.log("login non riuscito: "+resp.status);
      }
      
    });
  }

  register(){
    this.http.registerUserData(this.newUser).subscribe({
      next: (jsData: any) => {
        console.log(jsData)
        this.newCredentials.userId = jsData.userId;
        this.http.registerCredentials(this.newCredentials).subscribe({
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
