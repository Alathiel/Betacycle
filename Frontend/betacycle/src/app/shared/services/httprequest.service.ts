import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';
import { loginservice } from './loginservice.service';
import { Credential } from '../models/credential';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class HttprequestService {

  authJwtHeader = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  });

  constructor(private http: HttpClient, private auth: loginservice) { }

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

  AddAddress(address: Address)
  {
    return this.http.post(`https://localhost:7044/api/Addresses`, address);
  }

  DeleteAddress(id: number, iduser: number)
  {
    return this.http.delete(`https://localhost:7044/api/Addresses/${iduser}/${id}`);
  }

  GetAddresses(iduser: number, idaddress: number)
  {
    this.authJwtHeader = this.authJwtHeader.set
    (
      'Authorization',
      'Bearer ' + localStorage.getItem('jwtToken')
    )

    return this.http.get(`https://localhost:7044/api/Addresses/${iduser}/${idaddress}`, {headers: this.authJwtHeader});
  }

}
