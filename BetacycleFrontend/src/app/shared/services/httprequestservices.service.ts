import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Credentials } from '../models/credential';
import { Address } from '../models/address';
import { AddressPost } from '../models/address_post';
import { PaymentPost } from '../models/payment_post';
import { User } from '../models/user';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class HttprequestservicesService {
  constructor(private http: HttpClient) {}

  /**
   * Dichiarazione dell'header per l'autenticazione
   */
  authJwtHeader = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text',
  });

  //CREDENTIAL
  GetHttpCredential(): Observable<any> {
    return this.http.get(`https://localhost:7044/api/Credentials/GetCredential`);
  }

  deleteUserData(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7044/api/Users/${id}`);
  }

 /* Delete User and all their data */
 DeleteUser():Observable<any> {
  return this.http.delete(`https://localhost:7044/api/Users/DeleteUser`);
 }

 /* Confirm Credentials */
 ConfirmCredentials(cred: Credentials){
  return this.http.post(`https://localhost:7044/Confirm`, cred);
 }

  /**
   * Update password 
   * @param cred credential to modify
   * @returns 
   */
  PacthPassword(cred: Credentials): Observable<any> {
    return this.http.patch(
      `https://localhost:7044/api/Credentials/${cred.userId}`,
      cred
    );
  }

  /**Get method for user data */
  GetUserInfo(): Observable<any> {
    return this.http.get(`https://localhost:7044/api/Users/GetUser`);
  }

  //CRUD SINGLE USER
  /**
   * CRUD Operation for personal User
   * @param user user item contains data to update 
   * @returns 
   */
  PutUserData(user: User): Observable<any> {
    return this.http.put(`https://localhost:7044/api/Users/PutUser`, user);
  }

  /**
   * Update Email method for the user logged
   * @param cred credentials item contain email to update
   * @returns 
   */
  PutEmailData(cred: Credentials): Observable<any> {
    return this.http.put(`https://localhost:7044/api/Credentials/PutCredential`, cred);
  }

  /**
   * Update Password method if the user is already logged
   * @param cred credentials item contain password to update
   * @returns 
   */
  PutPassawordAlreadyLogged(cred: Credentials): Observable<any> {
    return this.http.put(
      `https://localhost:7044/api/Credentials/ChangePasswordLogOn`,
      cred
    );
  }

  //ALL OPERATION FOR ADDRESS
  /** Get method for all address*/
  GetHttpAddresses() {
    return this.http.get(`https://localhost:7044/api/Addresses/`);
  }
  /** Get method singol address */
  GetHttpAddressById(addressId: number): Observable<any> {
    var params = new HttpParams()
      .append("addressId", addressId)
    return this.http.get(
      `https://localhost:7044/api/Addresses/GetAddress`,{params: params}
    );
  }
  /**Delete method address */
  DeleteHttpAddresses(addressId: number) {
    var params = new HttpParams()
      .append("addressId", addressId)
    return this.http.delete(
      `https://localhost:7044/api/Addresses/DeleteAddress`,{params: params}
    );
  }

  /**
   * Insert method for address
   * @param address Address is AddressPost Item to insert in db
   * @returns 
   */
  PostHttpAddress(address: AddressPost): Observable<any> {
    return this.http.post(
      `https://localhost:7044/api/Addresses/PostAddress`,
      address
    );
  }
  /** Update method for address*/
  PutHttpAddress(address: any): Observable<any> {
    return this.http.put(
      `https://localhost:7044/api/Addresses/PutAddress`,
      address
    );
  }

  //CRUD OPERATION FOR PAYMENTS
  /** Get method payment for the logged user */
  GetHttpPayments(): Observable<any> {
    return this.http.get(`https://localhost:7044/api/Payments/`);
  }
  
  /** Delete method of the single payment  */
  DeleteHttpPayment(idPayment: number): Observable<any> {
    var params = new HttpParams().append('idPayment', idPayment);
    return this.http.delete(`https://localhost:7044/api/Payments/DeletePayment`, {
      params: params,
    });
  }

  /**
   * Post method to insert a new payment on db
   * @param payment PaymentPost item
   * @returns 
   */
  PostHttpPayment(payment: PaymentPost): Observable<any> {
    console.log(payment);
    return this.http.post(
      `https://localhost:7044/api/Payments/PostPayment`,
      payment
    );
  }

  //SignalR
  /** Open connection for SignalR function */
  getConnectionsOpen(): Observable<any> {
    return this.http.get('https://localhost:7044/GetConnectionsOpen');
  }

  //PRODUCT CALL

   /**
   * Standard call for show product with selection in pages
   */
   GetProducts(page: number): Observable<any> {
    var params = new HttpParams().append('pageNumber', page);
    return this.http.get('https://localhost:7044/api/Products/GetProducts', {
      params: params,
      observe: 'response',
    });
  }

  /**
   * Get for show product 
   * @param filter resereach
   * @param value 
   * @param page number page
   * @returns 
   */
  getFilteredProducts(
    filter: string,
    value: string,
    page: number
  ): Observable<any> {
    var params = new HttpParams()
      .append(filter, value)
      .append('pageNumber', page);
    return this.http.get('https://localhost:7044/api/Products/FilterProductsAdmin', {
      params: params,
      observe: 'response',
    });
  }

  /**
   * Research the products and show them
   * @param filter Filter of the name
   * @param value Name insert from the user
   * @param filter2 Filter of the color
   * @param value2 Color insert from the user
   * @param filter3 Filter of the price
   * @param value3 Price insert from the user
   * @param filter4 Filter of the operand < or > 
   * @param value4 Greater or Lower for research
   * @param page 
   * @returns 
   */
  getFilteredProductsUser(filter: string,value: string,
    filter2: string,value2: string,
    filter3: string,value3: number,
    filter4: string,value4: string,
    filter5: string,value5: string,
    page: number
  ): Observable<any> {
    var params = new HttpParams()
      .append(filter, value)
      .append(filter2, value2)
      .append(filter3, value3)
      .append(filter4, value4)
      .append(filter5, value5)
      .append('pageNumber', page);
    return this.http.get('https://localhost:7044/api/Products/FilterProducts', {
      params: params,
      observe: 'response',
    });
  }
  /** Get All Models from the Models Table */
  GetModel(): Observable<any> {
    return this.http.get(`https://localhost:7044/api/Models`);
  }

  /** Add a category in Category Table */
  AddCategory(category: any): Observable<any> {
    return this.http.post('https://localhost:7044/api/Categories', category, {
      observe: 'response',
    });
  }

  /** Add a model in Models Table */
  AddModel(model: any): Observable<any> {
    return this.http.post('https://localhost:7044/api/Models', model, {
      observe: 'response',
    });
  }
  /** Put method for update a product ONLY ADMIN ACCESSABLE */
  PutProduct(product: any): Observable<any> {
    return this.http.put(
      'https://localhost:7044/api/Products/PutProduct',
      product
    );
  }

  /** Delete method for delete a product from db ONLY ADMIN ACCESSABLE */
  DeleteProduct(id: number): Observable<any> {
    var params = new HttpParams().append('id', id);
    return this.http.delete(
      'https://localhost:7044/api/Products/DeleteProduct',
      { params: params, observe: 'response' }
    );
  }
  /** Post method for add a new product on db ONLY ADMIN ACCESSABLE */
  AddProduct(product: any): Observable<any> {
    return this.http.post('https://localhost:7044/api/Products', product, {
      observe: 'response',
    });
  }

  /**Get method that returns all categories */
  getCategories(): Observable<any> {
    return this.http.get('https://localhost:7044/api/Categories');
  }

  /**Get method that return all Log operation ADMIN ACCESSABLE */
  getLogs(page: number): Observable<any> {
    var params = new HttpParams().append('pageNumber', page);
    return this.http.get('https://localhost:7044/api/Logs', {
      params: params,
      observe: 'response',
    });
  }

  /**Get method that return all Log operation with research ADMIN ACCESSABLE */
  getLogsByFilter(
    value: string,
    filter: string,
    page: number
  ): Observable<any> {
    var params = new HttpParams()
      .append('filterC', filter)
      .append('value', value)
      .append('pageNumber', page);
    return this.http.get('https://localhost:7044/api/Logs/GetFilteredLogs', {
      params: params,
      observe: 'response',
    });
  }

  /** Get method that return the state if need to modify */
  GetLoggingState(): Observable<any> {
    return this.http.get('https://localhost:7044/api/Logs/GetLoggingStatus');
  }

  /** Get method that execute the operation on log */
  toggleLogging(): Observable<any> {
    return this.http.get('https://localhost:7044/api/Logs/ToggleLogging', {
      observe: 'response',
    });
  }

  /** Get method that return the cart for the logged user */
  GetCart(): Observable<any> {
    return this.http.get('https://localhost:7044/api/Carts/GetCart', {
      observe: 'response',
    });
  }
  
  /**Put method for add new product in the cart of the logged user */
  PutCart(cart: any): Observable<any> {
    return this.http.put('https://localhost:7044/api/Carts/PutCart', cart);
  }

  /**Post method for create a new cart for the logged user */
  PostCart(cart: any): Observable<any> {
    return this.http.post('https://localhost:7044/api/Carts/PostCart', cart);
  }

  /**Delete method for delete the single product from the cart of the logged user */
  DeleteProductFromCart(productId:any):Observable<any>
  {
    var params = new HttpParams()
      .append('productId', productId)
    return this.http.delete('https://localhost:7044/api/Carts/DeleteCart',{params:params});
  }

  /** Get method that return the single product searched by id ADMIN ACCESSABLE*/
  GetProductByID(id:number):Observable<any>
  {
    var params = new HttpParams()
      .append('id', id)
    return this.http.get(`https://localhost:7044/api/Products/GetProduct`,{params:params})
  }

  /* Get method that returns a single products with all its details by id */
  GetProductDetails(id:number):Observable<any>
  {
    var params = new HttpParams()
      .append('id', id)
    return this.http.get(`https://localhost:7044/api/Products/GetProductDetails`,{params:params})
  }

  /** Get method that return the single model searched by id ADMIN ACCESSABLE*/
  GetModelByID(id:number):Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Models/${id}`)
  }

  /** Get method that return the single category searched by id ADMIN ACCESSABLE*/
  GetCategoryByID(id:number):Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Categories/${id}`)
  }

  /** Get method that return all the deals of the month. They will show on carousel in the product page */
  GetHttpDeal():Observable<any>
  {
    return this.http.get(`https://localhost:7044/api/Products/GetDeals`)
  }

  UpdatePassword(cred: Credentials):Observable<any>
  {
    return this.http.patch('https://localhost:7044/api/Credentials/PatchPassword',cred);
  }

  ConfirmOrder(order:Order[]):Observable<any>
  {
    return this.http.post('https://localhost:7044/api/Orders',order);
  }

  GetOrders():Observable<any>
  {
    return this.http.get('https://localhost:7044/api/Orders');
  }
  
}
