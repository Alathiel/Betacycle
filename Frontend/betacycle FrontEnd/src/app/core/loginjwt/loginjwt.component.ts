import { Component } from '@angular/core';
import { Credentials } from '../../shared/models/credentials';
import { HttprequestService } from '../../shared/services/httprequest.service';
import { HttpStatusCode } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/Users';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ContactComponent } from '../../features/contact/contact.component';


@Component({
  selector: 'app-loginjwt',
  standalone: true,
  imports: [RouterModule , ContactComponent],
  templateUrl: './loginjwt.component.html',
  styleUrls: ['./loginjwt.component.css']
})
export class LoginjwtComponent {
  loginCredentials: Credentials = new Credentials();
  jwtToken: string = '';
  decodedTokenPayload: any;
  user: User = new User();

  constructor(
    private http: HttprequestService,
    private authStatus: AuthService,
    private router: Router
  ) {}

  Login(usr: HTMLInputElement, pwd: HTMLInputElement) {
    if (usr.value && pwd.value) {
      const email = usr.value;
      const password = pwd.value;

      this.http.GetUserByCredential(email, password).subscribe({
        next: (response: any) => {
          if (response != null) {
            this.http.LoginJwtPost(email, password).subscribe({
              next: (response: any) => {
                switch (response.status) {
                  case HttpStatusCode.Ok:
                    alert('Login avvenuto con successo!');
                    this.jwtToken = response.body.tokengenerated;
                    this.authStatus.setJwtLoginStatus(true, this.jwtToken);
                    break;
                  default:
                    console.error('Errore durante la richiesta:', response.status);
                    break;
                }
              },
              error: (err: any) => {
                console.error(err);
                if(err.status == HttpStatusCode.Forbidden)
                  {
                    if (confirm('Password Scaduta, desideri reimpostarla ora?')) {
                      this.router.navigateByUrl('/Setting-component');
                    } else {
                      console.log("L'utente ha deciso di non reimpostare la password");
                    }                  
                  }else if(err.status == HttpStatusCode.BadRequest) 
                    {
                      alert(' Credenziali non valide , Riprovare ')
                    }else if(err.status == HttpStatusCode.Unauthorized)
                      {
                        alert('Mancata Autorizzazione , Riprovare');
                      }else if(err.status == HttpStatusCode.Conflict)
                        {
                          console.error("si è verificato un errore di conflitto" + err);
                        }
              }
            });
          }
        },
        error: (err: any) => {
          console.error('Errore durante la richiesta dell\'utente:', err);
          console.log(HttpStatusCode + ' qualcosa non va');
        }
      });
    }
  }
}