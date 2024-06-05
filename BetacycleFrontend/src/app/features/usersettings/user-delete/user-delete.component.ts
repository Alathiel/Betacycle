import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Credentials } from '../../../shared/models/credential';
import { TOAST_STATE, ToastService } from '../../../shared/services/toast.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css'
})
export class UserDeleteComponent {

  constructor(private auth: AuthServiceService, private toast: ToastService, private http: HttprequestservicesService,
    private route: Router){}
  
  credentials: Credentials = new Credentials();
  deleteButton: boolean = true;

  ConfirmLogin(ConfirmLogin: any)
  {
    if(ConfirmLogin.valid){
      this.http.ConfirmCredentials(this.credentials).subscribe({
        next: (resp:any) => {
          this.deleteButton = false;
        },
        error: (error:any) => {
            this.toast.showToast(TOAST_STATE.error, error.message);
        }
      })
    }
  }

  DeleteAccountForever()
  {
    this.http.DeleteUser().subscribe({
      next: (resp:any) => {
        this.auth.Logout();
        window.location.reload();
        this.route.navigate(['home']);
      },
      error: (error:any) => {
          this.toast.showToast(TOAST_STATE.error, error.message);
      }
    })
  }

}
