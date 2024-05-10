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

  authJwtHeader = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  });

  deleteUserData(id: number):Observable<any>{
    return this.http.delete(`https://localhost:7044/api/Users/${id}`);
  }

  getCategories():Observable<any>{
    return this.http.get('https://localhost:7044/Categories');
  }

  getProducts(token: string):Observable<any>{
    return this.http.get('https://localhost:7044/api/Products', {headers: 
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      observe: 'response'
    });
  }

  getAddresses(token: string, id: string):Observable<any>{
    return this.http.get('https://localhost:7044/api/Users/Addresses/'+id, {headers: 
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      observe: 'response'
    });
  }

  getLogs(token: string):Observable<any>{
    return this.http.get('https://localhost:7044/api/Logs', {headers: 
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      observe: 'response'
    });
  }

  getLogsByFilter(token: string, value: string, filter: string):Observable<any>{
    return this.http.get('https://localhost:7044/api/Logs/GetLogsByDate/'+value+'/'+filter, {headers: 
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      observe: 'response'
    });
  }
}
