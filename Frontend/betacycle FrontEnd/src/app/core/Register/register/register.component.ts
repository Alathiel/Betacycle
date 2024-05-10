import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/models/Users';
import { Credentials } from '../../../shared/models/credentials';
import { HttprequestService } from '../../../shared/services/httprequest.service';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpStatusCode } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  newUsers: User = new User();
  credentialUser = new Credentials();
  isRegister = false;

  constructor(private http: HttprequestService) {}

  RegisterUser(dataInputFullName: HTMLInputElement, dataInputPhone: HTMLInputElement, dataInputEmail: HTMLInputElement, dataInputPassword: HTMLInputElement) {
    if (dataInputFullName.value != '' && dataInputPassword.value != '') {
      this.newUsers.fullName = dataInputFullName.value;
      this.newUsers.phone = dataInputPhone.value;
      this.credentialUser.email = dataInputEmail.value;
      this.credentialUser.password = dataInputPassword.value;

      this.http.RegisterUsersOnDb(this.newUsers).subscribe({
        next: (data: any) => {
          if (data != null) {
            const userId = data.userId; 

          
            this.credentialUser.userId = userId;
        
            console.log(this.newUsers);

            this.http.RegisterCredentialsOnDb(this.credentialUser).subscribe({
              next: (data: any) => {
                if (data != null) {

            this.credentialUser.userId = userId;

                  console.log(this.newUsers + '' + this.credentialUser);
                  this.isRegister = true;
                  alert("Registrazione Avvenuta Con Successo!!")
 
                  HttpStatusCode.Ok;
                }
              },
              error: (err) =>{
             console.error('errore durante la registrazione');
             HttpStatusCode.NotAcceptable;
              }
            });
          }
        }
      });
    }
  }
}
