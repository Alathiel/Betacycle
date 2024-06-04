import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorLog } from '../models/errorLog';
import { loginservice } from './loginservice.service';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private http: HttpClient;
  constructor(handler: HttpBackend, private token:AuthServiceService) {
    this.http = new HttpClient(handler);
  }

  logError(log:ErrorLog):Observable<any>
  {
    var token = this.token.getToken();
    if(token)
    {
      let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
      log.userId = decodedJWT.nameid
      
      return this.http.post("https://localhost:7044/api/Logs/PostError", log);
    }
    else
      return this.http.post("https://localhost:7044/api/Logs/PostError", log);
  }

  populateLog(error:any){
    var log = new ErrorLog();
    log = {
      statusCode: error.status.toString(),
      url: error.url,
      message: error.message,
      userId: ''
    }
    return log;
  }
}
