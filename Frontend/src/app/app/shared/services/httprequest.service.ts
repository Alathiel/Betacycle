import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttprequestService {

  constructor(private http:HttpClient) { }
  GetUserId(id:number)
  {
    return this.http.get(`https://localhost:7289/api/Authors/${id}`);
  }
}
