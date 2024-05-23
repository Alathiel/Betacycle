import { Component } from '@angular/core';
import { Credentials } from '../../shared/models/credentials';
import { AuthService } from '../../shared/services/auth.service';
import { HttprequestService } from '../../shared/services/httprequest.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-setting-component',
  templateUrl: './setting-component.component.html',
  styleUrls: ['./setting-component.component.css']
})
export class SettingComponentComponent {

  newCredential: Credentials = new Credentials();

  constructor(private httpService: AuthService, private httpRequest: HttprequestService) {}

  ResettingCredential(email: string, password: string) {
    if (email && password) {
      this.httpRequest.PostNewCredentialTime(email , password ).subscribe({
        next: (data: any) => {
          if (data != null)
           {
            HttpStatusCode.Ok;
            
            this.newCredential.email = data.email;
            this.newCredential.password = data.password;
            this.newCredential.passwordSalt = data.passwordSalt;
            alert("Credenziali Resettate Con Successo!!");
          }
           else 
           {
            HttpStatusCode.BadRequest;
           }
        },
        error: (err) => {
          console.error('Errore durante la registrazione', err);
          HttpStatusCode.NotAcceptable;
        }
      });
    } else {
      console.error('Email e password sono obbligatorie.');
    }
  }
}