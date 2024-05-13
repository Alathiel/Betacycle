import { Injectable } from '@angular/core';
import { AuthService } from '../services/Auth.service';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoggedInterceptorService implements HttpInterceptor {

  constructor(private auth:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<any>
  {
    // Get the auth token from the service.
    const authToken = this.auth.getToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the   authorization.
    const authReq = req.clone({
      setHeaders:{Authorization: 'Bearer ' + authToken}
    });
    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      catchError((error) => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401){
            alert("Token scaduto")
          }
        }
        return throwError(error);
      })
    );
  }

}
