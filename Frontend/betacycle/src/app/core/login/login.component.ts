import { Component } from '@angular/core';
import { HttprequestService } from '../../shared/services/httprequest.service';
import { Credentials } from '../../shared/models/credentials';
import { HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credential } from '../../shared/models/credential';
import { Router } from '@angular/router';
import { loginservice } from '../../shared/services/loginservice.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private http: HttprequestService, private router: Router, private authStatus: loginservice){}

  logincredentials: Credentials = new Credentials();
  logincredential: Credential = new Credential();
  credentials: Credentials = new Credentials();
  jwtToken: any;
  decodedTokenPayload: any;

  Login(usr: HTMLInputElement, pwd: HTMLInputElement)
  {
    if(usr.value != '' && pwd.value != '')
      {
        this.logincredential.email = usr.value;
        this.logincredential.password = pwd.value;

        this.http.LoginCredentialsJWT(this.logincredential).subscribe({
          next: (response: any) => 
            {
              switch(response.status)
              {
                case HttpStatusCode.Ok:
                  console.log("OK");
                  
                  //Jwt Auth
                  this.jwtToken = response.body.token;
                  //this.decodedTokenPayload = jwtDecode(this.jwtToken);
                  this.authStatus.setLoginJWT(true, this.jwtToken);
                  //console.log("UserId:", this.decodedTokenPayload.unique_name);

                  //Refresh della navbar e reindirizzamento sul products;
                  this.router.navigate(['/home']);
                  window.location.reload();
                  window.location.replace('http://localhost:4200/home');
                break;
              }
            },
            error: (err: any) => {
              this.authStatus.setLoginJWT(false);

              switch(err.status)
              {
                case HttpStatusCode.Unauthorized:
                  sessionStorage.setItem('temp', this.logincredential.email);
                  sessionStorage.setItem('userid', err.error.userId);
                  this.router.navigate(['/newuserpwd']);
                break;
                case HttpStatusCode.NotFound:
                  alert("Email or password are wrong");
                break;
              }
            }
      }
    );
    }
    else
    {
      alert('Username e password obbligatori!')
    }  
  }

  RegisterRedirect()
  {
    this.router.navigate(['/register']);
  }

}
