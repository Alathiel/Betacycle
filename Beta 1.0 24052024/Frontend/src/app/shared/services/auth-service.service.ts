import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credential';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import { Router,RouterOutlet } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  lastmod:string=''
  constructor(private http:HttpClient){

  }

  LoginJWT(credentials: Credentials): Observable<any>
  {
    return this.http.post('https://localhost:7044/JwtLogin',credentials, {observe: 'response'})
  }

  registerCredentials(credentials: Credentials):Observable<any>{
    this.lastmod = this.DateNow()
    credentials.lastmodified=this.lastmod
    return this.http.post("https://localhost:7044/JwtAuthentication/Register",credentials);
  }

  registerUserData(user: User):Observable<any>{
    return this.http.post("https://localhost:7044/api/Users",user);
  }

  RestoreHttpPassword(credentials:Credentials):Observable<any>
  {
    credentials.lastmodified=this.DateNow()
    console.log(credentials)
    return this.http.put(`https://localhost:7044/api/Credentials/PutCredentialPassword`,credentials)
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

  getDecodedTokenUpdate(token:string){
    if(token != null)
      return jwtDecode(token);
    else if(token != null)
      return jwtDecode(token);
    else
      return '';
  }

  
  DateNow()
  {
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

    return this.lastmod
  }
}
