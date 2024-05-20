import { Component } from '@angular/core';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { Credentials } from '../../shared/models/credential';
import { User } from '../../shared/models/user';
import { HttpStatusCode } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { loginservice } from '../../shared/services/loginservice.service';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  confermaPassword: string=''
  credentials: Credentials = new Credentials();
  disabled: boolean = false;
  stayConnected: boolean = false;
  newUser: User = new User();
  newCredentials: Credentials = new Credentials();

  constructor(private http: HttprequestservicesService, private logservice: loginservice, public router: Router, private AuthService: AuthServiceService) {

  }

  GoToLogin() {
    this.router.navigate(['/login'])
  }

  register() {
 
      this.AuthService.registerUserData(this.newUser).subscribe({
        next: (jsData: any) => {

          this.newCredentials.userId = jsData.userId;
          console.log(this)
          this.AuthService.registerCredentials(this.newCredentials).subscribe({
            next: (jsData: any) => {
              console.log(jsData)
              this.router.navigate(['/login'])
            },
            error: (error) => {
              console.log(error)
              this.http.deleteUserData(this.newCredentials.userId).subscribe({
                next: (jsData: any) => {
                  console.log(jsData)
                },
                error: (error) => { }
              })
            }

          })
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  
  
}
