import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {

  constructor(private http: HttpClient) {}

  newHeader = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  })
  
  CheckCredentials(credentials: Credentials): Observable<any>
  {
      var token = ""+sessionStorage.getItem('token');
      if(token === 'null')
      this.newHeader = this.newHeader.set(
        'Authorization',
        'Basic '+window.btoa(`${credentials.email}:${credentials.password}`)
      )
      else
      this.newHeader = this.newHeader.set(
        'Authorization', "Basic "+token
      )
    return this.http.get(`https://localhost:7044/Authentication/${credentials.email}`, {headers: this.newHeader, observe: 'response'});
  }
}
