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
    // header chiave valore perche' json
    // var credentials: any = sessionStorage.getItem('credentials');
    // var header = ""+localStorage.getItem('header');
    // const jsonObject = JSON.parse(header);
    // console.log(header)
    // if(header === 'null')
    // {
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
    //   console.log(this.newHeader)
      
    // }
    // console.log(window.btoa(`${credentials.email}:${credentials.password}`))
    // }
    // else
    //   this.newHeader = jsonObject;
    // // console.log(JSON.parse(localStorage.getItem("aa")))
    // console.log(this.newHeader)
    // var a = JSON.stringify(this.newHeader);
    // console.log(a);
    // console.log(JSON.parse(a));
   // this.newHeader = JSON.parse(a);
    return this.http.get(`https://localhost:7044/Authentication/${credentials.email}`, {headers: this.newHeader, observe: 'response'});
  }
}
