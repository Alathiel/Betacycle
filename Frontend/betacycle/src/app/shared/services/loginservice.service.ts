import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttprequestService } from './httprequest.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class loginservice {
  
  private logCheck: boolean = false;

  authJwtHeader = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  });

  constructor() {}

  setLoginJWT(logValue: boolean, jwtToken: string = ''){
    this.logCheck = logValue;
    if(logValue)
      {
        localStorage.setItem('jwtToken', jwtToken);
        this.authJwtHeader = this.authJwtHeader.set(
          'Authorization',
          'Bearer ' + jwtToken
        );
      }
      else
      {
        localStorage.removeItem('jwtToken');
        this.authJwtHeader = new HttpHeaders({
          contentType: 'application/json',
          responseType: 'text'
        });
       }
     }
      

  CheckingLogin(): boolean 
    {
       var validcredentials = localStorage.getItem('jwtToken');
        if (validcredentials === null) 
        {
          this.logCheck = false;
        }
        else
        {
          this.logCheck = true;
        }

        console.log(this.logCheck);

        return this.logCheck;
    }
}