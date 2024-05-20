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

    getModels():Observable<any>{
        return this.http.get('https://localhost:7044/api/Models');
    }

    getProducts(page:number):Observable<any>{
        var params = new HttpParams().append("pageNumber", page)
        return this.http.get('https://localhost:7044/api/Products/GetProducts', {params: params, observe: 'response'});
    }

    getFilteredProducts(filter: string, value: string, page:number):Observable<any>{
        var params = new HttpParams()
        .append(filter, value)
        .append("pageNumber", page)
        return this.http.get('https://localhost:7044/api/Products/FilterProducts', {params: params, observe: 'response'});
    }

    deleteUserData(id: number):Observable<any>{
        return this.http.delete(`https://localhost:7044/api/Users/${id}`);
    }
}
