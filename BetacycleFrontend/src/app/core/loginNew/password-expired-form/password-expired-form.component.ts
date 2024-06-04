import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() changeForm = new EventEmitter<string>();
  newPassword: string = ''
  confirmPassword: string = ''
  constructor(private http:HttprequestservicesService) {}
  status:string = 'op'
  UpdatePassword(){
    console.log('aa')
    this.oldCredentials.password = this.newPassword;
    this.http.UpdatePassword(this.oldCredentials).subscribe({
      next: (resp:any) => this.status = 'succ',
      error: (error:any) => {
        this.status = 'fail'
        console.log(error)
      }
    });
  }
}
