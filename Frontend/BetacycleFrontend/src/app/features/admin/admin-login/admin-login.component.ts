import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/Auth.service';
import { Credentials } from '../../../shared/models/credentials';
import { HttpStatusCode } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { TOAST_STATE, ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ToastComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  constructor(private AuthService: AuthService, private router: Router, private toast: ToastService){
    if(AuthService.getLoggedStatus())
      this.router.navigate(['admin-menu']);
  }
  credentials: Credentials = new Credentials()
  stayConnected: boolean = false
  successfull: boolean = false;
  showsToast = false
  toastType = ''
  

  loginJwt(){
    this.AuthService.AdminLoginJWT(this.credentials).subscribe({
      next: (resp:any) => {
        console.log(resp)
        if(resp.status == HttpStatusCode.Ok){
          this.AuthService.setLoggedStatus(this.stayConnected, resp.body);
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

