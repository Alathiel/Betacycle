import { Component, OnChanges } from '@angular/core';
import { User } from '../../../shared/models/user';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { TOAST_STATE, ToastService } from '../../../shared/services/toast.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  user: User = new User();

  constructor(
    private http: HttprequestservicesService,
    private toast:ToastService,private router:Router
  ) {
    this.http.GetUserInfo().subscribe({
      next: (data: any) => {
        this.user = data;
      },
    });
  }
  /**Update user info */
  UpdateUser() {
    this.http.PutUserData(this.user).subscribe({
      next: (data: any) => {    
        this.toast.showToast(TOAST_STATE.success,"Modifica effettuata con successo")
        const currentRoute = this.router.url;
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([currentRoute]); // navigate to same route
                });

      },
    });
  }
}
