import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Credentials } from '../../../shared/models/credential';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';

@Component({
  selector: 'app-password-expired-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-expired-form.component.html',
  styleUrl: './password-expired-form.component.css',
})
export class PasswordExpiredFormComponent {
  @Input() oldCredentials: Credentials = new Credentials();
  newPassword: string = ''
  confirmPassword: string = ''
  constructor(private http:HttprequestservicesService) {}

  UpdatePassword(){
    console.log('aa')
    this.oldCredentials.password = this.newPassword;
    this.http.UpdatePassword(this.oldCredentials).subscribe({
      next: (resp:any) => {
        console.log(resp)
      },
      error: (error:any) => {
        console.log(error)
      }
    });
  }
}
