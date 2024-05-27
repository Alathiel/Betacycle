import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Credentials } from '../models/credential';
import { Address } from '../models/address';
import { AddressPost } from '../models/address_post';
import { PaymentPost } from '../models/payment_post';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HttprequestservicesService {

  constructor(private http: HttpClient) {}

  authJwtHeader = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  });

  //CREDENTIAL
  GetHttpCredential(id:number):Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Credentials/${id}`)
  }

  deleteUserData(id: number):Observable<any>{
    return this.http.delete(`https://localhost:7044/api/Users/${id}`);
  }

  //PRODOTTI
  GetProducts(page:number):Observable<any>{
    var params = new HttpParams().append("pageNumber", page)
    return this.http.get('https://localhost:7044/api/Products/GetProducts', {params: params, observe: 'response'});
}
  getFilteredProducts(filter: string, value: string, page:number):Observable<any>{
    var params = new HttpParams()
    .append(filter, value)
    .append("pageNumber", page)
    return this.http.get('https://localhost:7044/api/Products/FilterProducts', {params: params, observe: 'response'});
}
  GetModel(): Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Models`);
  }
  AddCategory(category: any):Observable<any>
  {
    return this.http.post("https://localhost:7044/api/Categories", category, {observe: 'response'});
  }
  AddModel(model: any):Observable<any>
  {
    return this.http.post("https://localhost:7044/api/Models", model, {observe: 'response'});
  }

  //AGGIORNAMENTO PASSWORD
  PacthPassword(cred:Credentials):Observable<any>
  {
    return this.http.patch(`https://localhost:7044/api/Credentials/${cred.userId}`,cred);
  }

  //DATI UTENTE CONNESO
  GetUserInfo():Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Users/GetUser`)
  }

  //CRUD UTENTE SINGOLO
  PutUserData(id: number,user: User): Observable<any>
  {
    return this.http.put(`https://localhost:7044/api/Users/${id}`, user);
  }

  PutEmailData(id: number,cred: Credentials): Observable<any>
  {
    return this.http.put(`https://localhost:7044/api/Credentials/${id}`, cred);
  }
  
  PutPassawordAlreadyLogged(id: number,cred: Credentials): Observable<any>
  {
    return this.http.put(`https://localhost:7044/api/Credentials/ChangePasswordLogOn`, cred);
  }

  //Address
  GetHttpAddresses(token:any)
  {

    return this.http.get(`https://localhost:7044/api/Addresses/`)
  }

  GetHttpAddressById(addressid:number,userid:number): Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Addresses/${userid}/${addressid}`)
  }

  DeleteHttpAddresses(addressid:number,userid:number)
  {
    return this.http.delete(`https://localhost:7044/api/Addresses/${userid}/${addressid}`)
  }

  PostHttpAddress(address:AddressPost):Observable<any>
  {
    return this.http.post(`https://localhost:7044/api/Addresses/PostAddress`,address)
  }

  PutHttpAddress(address:AddressPost):Observable<any>
  {
    return this.http.put(`https://localhost:7044/api/Addresses/PutAddress`,address)
  }

  //PAGAMENTI
  GetHttpPaymentById():Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Payments/`)
  }
  DeleteHttpPayment(userid:number,idPayment:number):Observable<any>
  {
    return this.http.delete(`https://localhost:7044/api/Payments/${userid}/${idPayment}`)
  }
  PostHttpPayment(payment:PaymentPost):Observable<any>
  {
    return this.http.post(`https://localhost:7044/api/Payments/PostPayment`,payment)
  }
  
  //SignalR
  getConnectionsOpen():Observable<any>{
    return this.http.get("https://localhost:7044/GetConnectionsOpen");
  }

  PutProduct(product: any): Observable<any>
  {
    return this.http.put('https://localhost:7044/api/Products/PutProduct',product);
  }

  DeleteProduct(id:string):Observable<any>
  {
    var params = new HttpParams()
      .append("id", id)
    return this.http.delete('https://localhost:7044/api/Products/DeleteProduct',{params: params, observe: 'response'});
  }
  AddProduct(product: any):Observable<any>
  {
    return this.http.post("https://localhost:7044/api/Products", product, {observe: 'response'});
  }
  getModels():Observable<any>{
    return this.http.get('https://localhost:7044/api/Models');
  }
  getCategories():Observable<any>{
    return this.http.get('https://localhost:7044/api/Categories');
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

GetLoggingState():Observable<any>
{
  return this.http.get('https://localhost:7044/api/Logs/GetLoggingStatus');
}

toggleLogging():Observable<any>
{
  return this.http.get('https://localhost:7044/api/Logs/ToggleLogging',{observe: 'response'});
}

}
