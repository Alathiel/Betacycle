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

  deleteUserData(id: number):Observable<any>{
    return this.http.delete(`https://localhost:7044/api/Users/${id}`);
  }

  getCategories():Observable<any>{
    return this.http.get('https://localhost:7044/Categories');
  }

  getProducts():Observable<any>{
    return this.http.get('http://localhost:5270/api/Products');
  }
}
