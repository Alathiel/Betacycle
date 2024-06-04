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
  @Output() newItemEvent = new EventEmitter<string>();

  /**
   * @param token Token saved for change password if password is expired
   * @param stayConnected Check if the user is already log
   * @param credentials Credential item for registration
   */
  token:any
  stayConnected:boolean = false;
  credentials: Credentials = new Credentials();

  /**Change from Login to Registration */
  change(value: string) {
    this.credentials = new Credentials();
    this.newItemEvent.emit(value);
  }

  /** Login operation */
  loginJwt(loginForm: any){
    if(loginForm.valid){
      this.http.LoginJWT(this.credentials).subscribe({
        next:(response:any)=>
          {
            this.http.SetLoginStatus(this.stayConnected, response.body);
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
              this.toast.showToast(TOAST_STATE.error,"Email o Password errati")
              timer(10)
              this.toast.dismissToast()
              console.log(error)
              break;
          }
         } 
      })
    }
  }
}
