import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttprequestservicesService } from './httprequestservices.service';
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
  CheckingLogin(): boolean 
    {
       var validcredentials = sessionStorage.getItem('token');
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