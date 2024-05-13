import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  setLoggedStatus(stayConnected: boolean, resp: any){
    //var temp = jwtDecode(resp.token)
    //console.log(resp)
    if(!stayConnected){
      sessionStorage.setItem('token', resp.token);
    }
    else{
      localStorage.setItem('token', resp.token);
    }
  }

  getLoggedStatus(): boolean
  {
    if(sessionStorage.getItem('token') != null)
      return true;
    else if(localStorage.getItem('token') != null)
      return true;
    else
      return false;
  }

  getToken(){
    if(sessionStorage.getItem('token') != null)
      return sessionStorage.getItem('token');
    else if(localStorage.getItem('token') != null)
      return localStorage.getItem('token');
    else
      return '';
  }

  getDecodedToken(){
    if(sessionStorage.getItem('token') != null)
      return jwtDecode(sessionStorage.getItem('token')+'');
    else if(localStorage.getItem('token') != null)
      return jwtDecode(localStorage.getItem('token')+'');
    else
      return '';
  }

  LoginJWT(credentials: Credentials): Observable<any>
  {
    return this.http.post('https://localhost:7044/JwtLogin',credentials, {observe: 'response'})
  }

  AdminLoginJWT(credentials: Credentials): Observable<any>
  {
    return this.http.post('https://localhost:7044/JwtAuthentication/AdminLogin',credentials, {observe: 'response'})
  }

  Logout(){
    localStorage.clear()
    sessionStorage.clear()
  }

}
