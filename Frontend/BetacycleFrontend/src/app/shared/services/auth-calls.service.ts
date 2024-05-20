import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthCalls {

  constructor(private http: HttpClient) {}

  deleteUserData(id: number):Observable<any>{
    return this.http.delete(`https://localhost:7044/api/Users/${id}`);
  }

  getCategories():Observable<any>{
    return this.http.get('https://localhost:7044/Categories');
  }

  getProducts():Observable<any>{
    return this.http.get('https://localhost:7044/api/Products/GetProducts', {observe: 'response'});
  }

  getFilteredProducts(filter: string, value: string):Observable<any>{
    var params = new HttpParams().append(filter, value)
    return this.http.get('https://localhost:7044/api/Products/FilterProducts', {params: params, observe: 'response'});
  }

  getAddresses(id: string):Observable<any>{
    var params = new HttpParams().append("id", id)
    return this.http.get('https://localhost:7044/api/Users/Addresses', {params: params, observe: 'response'});
  }

  getLogs(page:number):Observable<any>{
    var params = new HttpParams()
        .append("pageNumber", page)
    return this.http.get('https://localhost:7044/api/Logs', {params: params, observe: 'response'});
  }

  getLogsByFilter(value: string, filter: string, page:number):Observable<any>{
    var params = new HttpParams()
        .append("filterC", filter)
        .append("value", value)
        .append("pageNumber", page)
    return this.http.get('https://localhost:7044/api/Logs/GetFilteredLogs', {params: params, observe: 'response'});
  }

  putProduct(product: any): Observable<any>
  {
    return this.http.put('https://localhost:7044/api/Products/PutProduct',product);
  }

  getCart(){
    return this.http.get('cart');
  }

  getLogsNumber():Observable<any>
  {
    return this.http.get('https://localhost:7044/api/Logs/GetLogsNumber');
  }

  deleteProduct(id:string):Observable<any>
  {
    var params = new HttpParams()
      .append("id", id)
    return this.http.delete('https://localhost:7044/api/Products/DeleteProduct',{params: params, observe: 'response'});
  }

  getLoggingState():Observable<any>
  {
    return this.http.get('https://localhost:7044/api/Logs/GetLoggingStatus');
  }

  toggleLogging():Observable<any>
  {
    return this.http.get('https://localhost:7044/api/Logs/ToggleLogging',{observe: 'response'});
  }
}
