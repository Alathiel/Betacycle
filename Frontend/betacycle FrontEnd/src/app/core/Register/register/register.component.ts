import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/models/Users';
import { Credentials } from '../../../shared/models/credentials';
import { HttprequestService } from '../../../shared/services/httprequest.service';
import { HttpStatusCode } from '@angular/common/http';
import { ContactComponent } from '../../../features/contact/contact.component';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ContactComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  newUsers: User = new User();
  credentialUser = new Credentials();
  isRegister = false;



  constructor(private http: HttprequestService) { }

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
                  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                  if (!emailRegex.test(this.credentialUser.email)) {
                    alert('Inserire Email Nel Formato Corretto');
                    console.error("Inserire Credenziali nel formato corretto : Email");
                  }

                  else if (this.credentialUser.password.length < 5) {
                    alert("Credenziali Non Valide");
                    console.log("Credenziali non valide");
                    console.error("Inserire Credenziali Valide : Min 5 Char");
                  }
                  else if (this.credentialUser.email.length > 25) {
                    alert("Credenziali Non Valide");
                    console.log("Credenziali non valide");
                    console.error("Inserire Email : Max 25 Char");
                  }
                  else {
                    alert("Registrazione Avvenuta Con Successo!!");
                  }

                }
                else {
                  HttpStatusCode.BadRequest;
                }
              },
              error: (err) => {
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
