import { Component } from '@angular/core';
import { Credential } from '../../shared/models/credential';
import { Credentials } from '../../shared/models/credentials';
import { HttprequestService } from '../../shared/services/httprequest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newuserpwd',
  standalone: true,
  imports: [],
  templateUrl: './newuserpwd.component.html',
  styleUrl: './newuserpwd.component.css'
})
export class NewUserPwdComponent {

  updatecredential: Credentials = new Credentials();
  lastmod: string = '';


  constructor(private http: HttprequestService, private router: Router)
  {
    this.updatecredential.email = sessionStorage.getItem('temp')!;
    if(localStorage.getItem('jwtToken') != null)
      {
        this.router.navigate(['/home']);
      }
  }

  NewPassword(pwd: HTMLInputElement, password: HTMLInputElement)
  {
    this.updatecredential.password = password.value;
    this.updatecredential.userId = parseInt(sessionStorage.getItem('userid')!);
    this.updatecredential.id = parseInt(sessionStorage.getItem('userid')!);

    this.lastmod = new Date(Date.now()).getFullYear().toString();

    if ((new Date(Date.now()).getMonth() + 1).toString().length < 2) {
      this.lastmod = this.lastmod + "-" + "0" + (new Date(Date.now()).getMonth() + 1).toString();
    }
    else {
      this.lastmod = this.lastmod + "-" + (new Date(Date.now()).getMonth() + 1).toString();
    }


    if ((new Date(Date.now()).getDate() + 1).toString().length < 2) {
      this.lastmod = this.lastmod + "-" + "0" + new Date(Date.now()).getDate().toString();
    }
    else {
      this.lastmod = this.lastmod + "-" + new Date(Date.now()).getDate().toString();
    }

    this.updatecredential.lastModified = this.lastmod;

    sessionStorage.removeItem('temp');
    sessionStorage.removeItem('userid');

    if (pwd.value != password.value) {
      alert("Make sure the fields match!");
    }
    else {
      this.http.PatchCredentials(this.updatecredential.userId, this.updatecredential)
      .subscribe
      ({
        next: (data: any) => {
          this.updatecredential = data;
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }  
  }

}
