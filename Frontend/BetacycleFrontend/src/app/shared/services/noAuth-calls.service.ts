import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoAuthCalls {
    private http: HttpClient;
    constructor(handler: HttpBackend) {
        this.http = new HttpClient(handler);
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
}
