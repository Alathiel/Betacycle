import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';
import { loginservice } from './loginservice.service';
import { Credential } from '../models/credential';

@Injectable({
  providedIn: 'root'
})
export class HttprequestService {

  authJwtHeader = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  });

  constructor(private http: HttpClient, private auth: loginservice) { }

  /*LoginCredentials(credential: Credentials): Observable<any>
  {
    var token = ""+localStorage.getItem('token');
    if(token === 'null')
      {
        this.newHeader = this.newHeader.set(
          'Authorization',
          'Basic '+window.btoa(credential.email+":"+credential.password)
        )
      }
    else
    {
      this.newHeader = this.newHeader.set(
        'Authorization', "Basic "+token
      )
    }

    /*this.newHeader = this.newHeader.set(
      'Authorization',
      'Basic '+window.btoa(credential.usrname+":"+credential.password)
    )

    this.user = window.btoa(credential.email);
    this.pass = window.btoa(credential.password)
    return this.http.get(`https://localhost:7044/Authentication/${this.user}/${this.pass}`, 
    {
      headers: this.newHeader,
      observe: 'response'
    });
  }*/

  LoginCredentialsJWT(credential: Credential): Observable<any>
  {
    return this.http.post(`https://localhost:7044/LoginJwt`, credential, {
      observe: 'response',
    });
  }

  GetUserInfo(id: number): Observable<any>
  {
    this.authJwtHeader = this.authJwtHeader.set
    (
      'Authorization',
      'Bearer ' + localStorage.getItem('jwtToken')
    )

    return this.http.get(`https://localhost:7044/api/Users/${id}`, {headers: this.authJwtHeader});
  }

  GetProducts(): Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Products`);
  }

  GetPageProducts(page: number): Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Products/${page}`);
  }

  GetModel(): Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Models`);
  }

  PostNewCredential(newCred: Credentials): Observable<any>
  {
    return this.http.post(`https://localhost:7044/api/Credentials`, newCred);
  }

  PostNewUser(newUser: User): Observable<any>
  {
    return this.http.post(`https://localhost:7044/api/Users`, newUser);
  }

  PatchCredentials(id: number, credentials: Credentials)
  {
    return this.http.patch(`https://localhost:7044/api/Credentials/${id}`, credentials);
  }

}
