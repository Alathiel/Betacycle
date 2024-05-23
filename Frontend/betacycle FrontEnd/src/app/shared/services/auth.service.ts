import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged: boolean = false;

  authJwtHeader = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  });

  newRoot : Router = new Router();

  constructor() {}

  setJwtLoginStatus(logValue: boolean, jwtToken: string='') {
    this.isLogged = logValue;
    if (logValue) {
      sessionStorage.setItem('jwtToken', jwtToken);
      this.authJwtHeader = this.authJwtHeader.set(
        'Authorization',
        'Bearer ' + jwtToken
      );

      console.log(this.authJwtHeader)
    } else {
      sessionStorage.removeItem('jwtToken');
      this.authJwtHeader= new HttpHeaders({
        contentType: 'application/json',
        responseType: 'text'
      });
    }
  }
  
  getLoginStatus() 
  
{
  return this.isLogged;
}
  
  logout() : void 
  
  {  this.setJwtLoginStatus(false);
    
    if(confirm('Sei Sicuro Di Voler Uscire?'))
      { 
        alert('La Sessione Verrà Interrotta')
        this.newRoot.navigateByUrl('/home')
      }
      else 
      {console.log("L'Utente non si è disconnesso");}
    
  }

}
