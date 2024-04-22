import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  newHeader = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  })

  Login(credentials: Credentials): Observable<any>
  {
      
      this.newHeader = this.newHeader.set(
        'Authorization',
        'Basic '+window.btoa(`${credentials.email}:${credentials.password}`)
      )

    return this.http.post('https://localhost:7044/Login', credentials, {headers: this.newHeader, observe: 'response'});
  }

  registerCredentials(credentials: Credentials):Observable<any>{
    return this.http.post("https://localhost:7044/Authentication",credentials);
  }

  registerUserData(user: User):Observable<any>{
    return this.http.post("https://localhost:7044/api/Users",user);
  }

}
