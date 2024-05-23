// import { HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { User } from '../models/Users';
// import { HttprequestservicesService } from './httprequest.service';
// import { jwtDecode } from 'jwt-decode';

// @Injectable({
//   providedIn: 'root'
// })
// export class loginservice {
  
//   private logCheck: boolean = false;

//   authJwtHeader = new HttpHeaders({
//     contentType: 'application/json',
//     responseType: 'text'
//   });

//   constructor() {}

//   setLoginJWT(logValue: boolean, jwtToken: string = ''){
//     this.logCheck = logValue;
//     if(logValue)
//       {
//         sessionStorage.setItem('token', jwtToken);
//         this.authJwtHeader = this.authJwtHeader.set(
//           'Authorization',
//           'Bearer ' + jwtToken
//         );
//       }
//       else
//       {
//         sessionStorage.removeItem('token');
//         this.authJwtHeader = new HttpHeaders({
//           contentType: 'application/json',
//           responseType: 'text'
//         });
//        }
//      }
      

//   CheckingLogin(): boolean 
//     {
//        var validcredentials = sessionStorage.getItem('token');
//         if (validcredentials === null) 
//         {
//           this.logCheck = false;
//         }
//         else
//         {
//           this.logCheck = true;
//         }

//         console.log(this.logCheck);

//         return this.logCheck;
//     }
// }