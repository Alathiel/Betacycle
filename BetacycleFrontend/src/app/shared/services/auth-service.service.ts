import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credential';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import { Router,RouterOutlet } from '@angular/router';
import { RegisterUser } from '../models/RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  lastmod:string=''
  constructor(private http:HttpClient){

  }

  LoginJWT(credentials: Credentials): Observable<any>
  {
    return this.http.post('https://localhost:7044/JwtLogin',credentials)
  }

  AdminLoginJWT(credentials: Credentials): Observable<any>
  {
    return this.http.post('https://localhost:7044/JwtAuthentication/AdminLogin',credentials, {observe: 'response'})
  }

  registerCredentials(credentials: RegisterUser):Observable<any>{
    return this.http.post("https://localhost:7044/JwtAuthentication/Register",credentials);
  }

  RestoreHttpPassword(credentials:Credentials):Observable<any>
  {
    return this.http.put(`https://localhost:7044/api/Credentials/PutCredentialPassword`,credentials)
  }

  getLoginStatus(){
    if(sessionStorage.getItem('token') || localStorage.getItem('token')){
      return true;
    }
    else
      return false;
  }

  SetLoginStatus(stayConnected: boolean, resp: any){
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

  checkUser(){
    const {role} = this.getDecodedToken() as {role: string}
    if(role == "User")
      return true
    return false; 
  }

  checkAdmin(){
    const {role} = this.getDecodedToken() as {role: string}
    if(role == "Admin")
      return true
    return false; 
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
  
  Logout(){
    localStorage.clear()
    sessionStorage.clear()
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
