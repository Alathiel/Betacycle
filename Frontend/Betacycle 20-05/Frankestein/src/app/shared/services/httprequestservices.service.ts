import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Credentials } from '../models/credential';
import { Address } from '../models/address';
import { AddressPost } from '../models/address_post';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HttprequestservicesService {

  constructor(private http: HttpClient) {}

  authJwtHeader = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  });

  //CREDENTIAL
  GetHttpCredential(id:number):Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Credentials/${id}`)
  }

  deleteUserData(id: number):Observable<any>{
    return this.http.delete(`https://localhost:7044/api/Users/${id}`);
  }

  //PRODOTTI
  GetProducts(): Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Products/GetProducts`);
  }
  GetModel(): Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Models`);
  }

  //AGGIORNAMENTO PASSWORD
  PacthPassword(cred:Credentials):Observable<any>
  {
    return this.http.patch(`https://localhost:7044/api/Credentials/${cred.userId}`,cred);
  }
  //DATI UTENTE CONNESO
  GetUserInfo():Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Users/GetUser`)
  }

  PutUserData(id: number,user: User): Observable<any>
  {
    return this.http.put(`https://localhost:7044/api/Users/${id}`, user);
  }

  PutCredentialData(id: number,cred: Credentials): Observable<any>
  {
    return this.http.put(`https://localhost:7044/api/Credentials/${id}`, cred);
  }

  PutCredentialPassword(id: number,cred: Credentials): Observable<any>
  {
    return this.http.put(`https://localhost:7044/api/Credentials/PutCredentialPassword/${id}`, cred);
  }

  //Address
  GetHttpAddresses(token:any)
  {

    return this.http.get(`https://localhost:7044/api/Addresses/`)
  }

  GetHttpAddressById(addressid:number,userid:number): Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Addresses/${userid}/${addressid}`)
  }

  DeleteHttpAddresses(addressid:number,userid:number)
  {
    return this.http.delete(`https://localhost:7044/api/Addresses/${userid}/${addressid}`)
  }

  PostHttpAddress(address:AddressPost):Observable<any>
  {
    return this.http.post(`https://localhost:7044/api/Addresses/PostAddress`,address)
  }

  PutHttpAddress(address:AddressPost):Observable<any>
  {
    return this.http.put(`https://localhost:7044/api/Addresses/PutAddress`,address)
  }
}
