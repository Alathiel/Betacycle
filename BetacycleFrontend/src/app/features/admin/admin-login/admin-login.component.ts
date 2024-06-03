import { Component } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { TOAST_STATE, ToastService } from '../../../shared/services/toast.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { Credentials } from '../../../shared/models/credential';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ToastComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  constructor(private AuthService: AuthServiceService, private router: Router, private toast: ToastService){
    if(AuthService.getLoginStatus())
      this.router.navigate(['admin-menu']);
  }
  credentials: Credentials = new Credentials()
  stayConnected: boolean = false
  successfull: boolean = false;

  loginJwt(form:any){
    if(form.valid){
      this.AuthService.AdminLoginJWT(this.credentials).subscribe({
        next: (resp:any) => {
          console.log(resp)
          if(resp.status == HttpStatusCode.Ok){
            this.AuthService.SetLoginStatus(this.stayConnected, resp.body);
            this.toast.dismissToast()
            this.router.navigate(['admin-menu']);
          }
        },
        error: (error:any) =>{
          this.toast.showToast(TOAST_STATE.error, 'Email o password non corretti')
        }
      })
    }
  }
}

