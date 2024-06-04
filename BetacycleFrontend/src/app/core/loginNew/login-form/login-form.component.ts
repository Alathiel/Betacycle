import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { Credentials } from '../../../shared/models/credential';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { TOAST_STATE, ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private http:AuthServiceService,private router:Router, public toast:ToastService){}
  @Output() changeForm = new EventEmitter<string>();
  @Output() PasswordExpired = new EventEmitter<object>();
  
  /**
   * @param token Token saved for change password if password is expired
   * @param stayConnected Check if the user is already log
   * @param credentials Credential item for registration
   */
  
  token:any
  stayConnected:boolean = false;
  credentials: Credentials = new Credentials();

  /** Login operation */
  loginJwt(loginForm: any){
    if(loginForm.valid){
      this.http.LoginJWT(this.credentials).subscribe({
        next: (resp:any) => {
        if(resp.status == HttpStatusCode.Ok){
          
          this.http.SetLoginStatus(this.stayConnected, resp.body);
          window.location.reload()
          this.router.navigate(['home'])
        }
        else
          console.log("login non riuscito: "+resp.status);
          this.toast.showToast(TOAST_STATE.error,'resp')
      },
      error: (error:any) => {
        if(error.status == 401)
            this.PasswordExpired.emit({status:'expired', credentials:this.credentials});
      }
      })
    }
  }
}
