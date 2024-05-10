import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credentials';
import { User } from '../models/Users';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class HttprequestService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  // LoginPost(credential: Credentials): Observable<any> {
  //   return this.http.post(`https://localhost:7132/login`, credential, {
  //     observe: 'response',
  //   });
  // }

  LoginJwtPost(email: string, password: string): Observable<any> {
    return this.http.post(`https://localhost:7044/api/Login/LogCredential`, {
      email: email,
      password: password,
      passwordSalt: '' }, {
      observe: 'response'
    });
  }

  RegisterUsersOnDb(users: User): Observable<any> {
    return this.http.post(`https://localhost:7044/api/Users`, users);
  }

  RegisterCredentialsOnDb(credential: Credentials): Observable<any> {
    return this.http.post(`https://localhost:7044/api/Credentials`, credential);
  }

  GetAuhtors(): Observable<any> {
    return this.http.get(`https://localhost:7132/api/authors`);
  }

  GetJwtAuhtors(): Observable<any> {
    return this.http.get(`https://localhost:7132/api/authors`,{headers: this.auth.authJwtHeader});
  }

  
  GetUserByCredential(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
  
    return this.http.get(`https://localhost:7044/api/Credentials`, {
      params: params,
      observe: 'response'
    });
  }
  DeleteAuhtorById(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7132/api/authors/${id}`, {
      headers: this.auth.authBasicHeader,
    });
  }

  // IPOTETICA NUOVA CHIAMATA HTTP, LEGGERA' LE CREDENZIALI DALLA LOCALSTORAGE:
  // THIS.VALIDCREDENTIALS = LOCALSTORAGE.GETITEM('TOKEN')
}
