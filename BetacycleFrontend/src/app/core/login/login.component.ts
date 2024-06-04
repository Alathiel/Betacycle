import { Component } from '@angular/core';
import { RouterModule,Router,RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { Credentials } from '../../shared/models/credential';
import { User } from '../../shared/models/user';
import { HttpStatusCode } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { loginservice } from '../../shared/services/loginservice.service';
import { timer } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import { TOAST_STATE, ToastService } from '../../shared/services/toast.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errore:any
  token:any
  
  lastmod:string=''    
  credentials: Credentials = new Credentials();
  disabled: boolean = false;
  stayConnected: boolean = false;
  newUser: User = new User();
  newCredentials: Credentials = new Credentials();

  constructor(private http:HttprequestservicesService, private logservice:loginservice,public router: Router, private AuthService:AuthServiceService,private toast:ToastService){
    if(logservice.CheckingLogin()){
      this.router.navigate(['home'])
    }
  }

  /**
   * Login function with JWT token
   * If the result of the operation is negative go on switch to show different result
   */
  loginJwt()
  {
    this.AuthService.LoginJWT(this.credentials).subscribe({
      next:(response:any)=>
        {
          this.AuthService.SetLoginStatus(this.stayConnected, response.body);
            window.location.reload();
            this.router.navigate(['home'])

        },
        error:(error:any)=>
       {
        switch(error.status)
        {
          case HttpStatusCode.Unauthorized:
            this.token=error.error.token
            sessionStorage.setItem('tmptoken',this.token)
            this.router.navigate(['/updatepsw'])
            break;
          case HttpStatusCode.BadRequest:
            this.toast.showToast(TOAST_STATE.error,"Email e/o Password errati")
            timer(10)
            this.toast.dismissToast()
            console.log(error)
            break;
        }
       } 
    })
  }

  /**Logout operation */
  logout(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate(['home'])
  }

  /** */
  GoToRestorePsw()
  {
    this.router.navigate(['restore'])
  }

  DateNow()
  {
    this.lastmod = new Date(Date.now()).getFullYear().toString();

    if((new Date(Date.now()).getMonth()+1).toString().length < 2)
    {
      this.lastmod = this.lastmod + "-" + "0" + (new Date(Date.now()).getMonth()+1).toString();
    }
    else
    {
      this.lastmod = this.lastmod + "-" + (new Date(Date.now()).getMonth()+1).toString();
    }
      

    if((new Date(Date.now()).getDate()+1).toString().length < 2)
    {
      this.lastmod = this.lastmod + "-" + "0" + new Date(Date.now()).getDate().toString();
    }
    else
    {
      this.lastmod = this.lastmod + "-" + new Date(Date.now()).getDate().toString();
    }

    return this.lastmod
  }
  
  GoToRegistration()
  {
    this.router.navigate(['/registration'])
  }
}