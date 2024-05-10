import { Component } from '@angular/core';
import { HttprequestService } from '../../shared/services/httprequest.service';
import { Credentials } from '../../shared/models/credentials';
import { HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credential } from '../../shared/models/credential';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  newCredential: Credentials = new Credentials();
  newUser: User = new User();
  newUserControl: User = new User();
  lastmod: string = '';

  constructor(private http: HttprequestService, private router: Router) { }

  RegisterNewUser(name: HTMLInputElement,surname: HTMLInputElement, phone: HTMLInputElement, birthdate: HTMLInputElement, email: HTMLInputElement, psw: HTMLInputElement) {
    if (birthdate.value != '' && name.value != '' && surname.value != '' && phone.value != '') {

      this.newUser.firstName = name.value;
      this.newUser.lastName = surname.value;
      this.newUser.phone = phone.value;
      this.newUser.birthDate = birthdate.value;
      this.newUser.security = 0;

      this.http.PostNewUser(this.newUser)
        .subscribe
        ({
          next: (data2: any) => {
            this.RegisterNewCredential(email.value, psw.value, data2.userId);
            
          },
          error: (err: any) => {
            console.log(err);
          }
        })
    }
    else 
    {
      alert("Inserire tutti i dati!");
    }

  }

  RegisterNewCredential(email: string, psw: string, userid: number) 
  {
    this.newCredential.email = email;
    this.newCredential.password = psw;
    this.newCredential.userId = userid;
    this.newCredential.id = userid;

    this.lastmod = new Date(Date.now()).getFullYear().toString();

    if((new Date(Date.now()).getMonth()+1).toString().length < 2)
    {
      this.lastmod = this.lastmod + "-" + "0" + (new Date(Date.now()).getMonth()+1).toString();
    }
    else
    {
      this.lastmod = this.lastmod + "-" + (new Date(Date.now()).getMonth()+1).toString();
    }
      

    if((new Date(Date.now()).getDate()+1).toString().length < 2)
    {
      this.lastmod = this.lastmod + "-" + "0" + new Date(Date.now()).getDate().toString();
    }
    else
    {
      this.lastmod = this.lastmod + "-" + new Date(Date.now()).getDate().toString();
    }

    this.newCredential.lastModified = this.lastmod;

    console.log(this.newCredential.lastModified);

    if (email != '' && psw != '') 
    {

      this.http.PostNewCredential(this.newCredential)
        .subscribe
        ({
          next: (data: any) => {
            this.newCredential = data;
          },
          error: (err: any) => {
            console.log(err);
          }
        })
    }
    else 
    {
      alert("Inserire tutti i dati!");
    }
    this.router.navigate(['/products']);
    window.location.reload();
    window.location.replace('http://localhost:4200/products');
  }

}
