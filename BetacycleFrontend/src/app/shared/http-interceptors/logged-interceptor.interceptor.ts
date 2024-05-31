import { Injectable } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoggingService } from '../services/logging.service';
@Injectable({
  providedIn: 'root'
})
export class LoggedInterceptorService implements HttpInterceptor {

  constructor(private auth:AuthServiceService, private router:Router, private logger:LoggingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<any>
  {
    let authReq = req;
    const authToken = this.auth.getToken();
    if (authToken) {
      const payload = this.auth.getDecodedToken()
      const {role} = payload as {role: string}
      if(role === 'Admin'){
        const {exp} = payload as {exp: number}
        if (Date.now() >= exp * 1000) { // Check token exp.
          this.router.navigate(['admin-login'])
          localStorage.clear()
          sessionStorage.clear()
          alert("Login expired, please login again.")
          throw ('Token expired');
        }
      }

      // If we have a token, we set it to the header
      authReq = req.clone({
        setHeaders:{Authorization: 'Bearer ' + authToken}
      });
    }
    
    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      catchError((error) => {
        if(error instanceof HttpErrorResponse){
          /*if(error.status === 401){
            alert("Login expired, please login again.")
            this.router.navigate(['admin-login'])
          }*/
          if(error.status === 404)
            console.log("Not found")
          else
          {
            this.logger.logError(this.logger.populateLog(error)).subscribe(response => {
            })
          }
        }
        return (error);
      })
    );
  }

}
