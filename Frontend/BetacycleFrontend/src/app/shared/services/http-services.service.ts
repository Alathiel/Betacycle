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

  
  CheckCredentials(credentials: Credentials): Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Credentials/${credentials.email}/${credentials.password}`);
  }

  RegisterUser(user: User){
    return this.http.post("http://localhost:5270/api/Users", user);
  }

  RegisterCredentials(credentials: Credentials){
    return this.http.post("https://localhost:7044/api/Credentials", credentials);
  }
}
