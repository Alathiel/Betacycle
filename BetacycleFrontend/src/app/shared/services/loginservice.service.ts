import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


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
  /**Check if the user is alredy logged */
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