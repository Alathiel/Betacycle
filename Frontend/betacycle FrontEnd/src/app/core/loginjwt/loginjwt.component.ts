import { Component } from '@angular/core';
import { Credentials } from '../../shared/models/credentials';
import { HttprequestService } from '../../shared/services/httprequest.service';
import { HttpStatusCode } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../shared/models/Users';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-loginjwt',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './loginjwt.component.html',
  styleUrl: './loginjwt.component.css',
})
export class LoginjwtComponent {
  loginCredentials: Credentials = new Credentials();
  jwtToken: string = '';
  decodedTokenPayload: any;
  user: User = new User();

  newUsers: User = new User();
  credentialUser = new Credentials();
  isRegister = false;

  showLogin = true;

  constructor(
    private http: HttprequestService,
    private authStatus: AuthService
  ) {}

  Login(usr: HTMLInputElement, pwd: HTMLInputElement) {
    if (usr.value != '' && pwd.value != '') {
      const email = usr.value;
      const password = pwd.value;
  
      this.http.GetUserByCredential(email, password).subscribe({
        next: (response: any) => {
          console.log(response + 'sono qui')

          if (response != null) {
            
            this.http.LoginJwtPost(email , password).subscribe({
              next: (response: any) => {
                if (response != null) {
                  this.loginCredentials.email = email;
                  this.loginCredentials.password = password;
           
                  this.loginCredentials.email = email;
                  this.loginCredentials.password = password;
                  switch (response.status) {
                    case HttpStatusCode.Ok:
                      alert("Log avvenuto con successo!");
                      console.log("in next..");
                      this.jwtToken = response.body.tokengenerated;
                      this.authStatus.setJwtLoginStatus(true, this.jwtToken);
                      this.decodedTokenPayload = jwtDecode(this.jwtToken);
                      console.log(this.decodedTokenPayload);
                      console.log("Username:", this.decodedTokenPayload.unique_name);
                      break;
                    case HttpStatusCode.NoContent:
                      console.log('NESSUN CONTENUTO');
                      break;
                  }
                }
              },
              error: () => {
                alert('Password o email errata, riprova');
                this.authStatus.setJwtLoginStatus(false);
              }
            });
          }
        },
        error: (err: any) => {
          console.error('Errore durante la richiesta dell\'utente:', err);
        }
      });
    } else {
      alert('Username e Password, obbligatori!');
    }
  }
  GetAuthors() {
   
  }



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