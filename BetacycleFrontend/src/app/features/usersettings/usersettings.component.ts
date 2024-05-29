import { Component, Input, TemplateRef, input } from '@angular/core';
import { Address } from '../../shared/models/address';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { jwtDecode } from 'jwt-decode';
import { FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { User } from '../../shared/models/user';
import { AddressPost } from '../../shared/models/address_post';
import { Credentials } from '../../shared/models/credential';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from '../../shared/models/payment';
import { PaymentPost } from '../../shared/models/payment_post';

import { UserInfoComponent } from './user-info/user-info.component';
import { UserCredentialsComponent } from "./user-credentials/user-credentials.component";
import { UseraddressComponent } from './useraddress/useraddress.component';
import { UserpaymentsComponent } from './userpayments/userpayments.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usersettings',
  standalone: true,
  imports: [CommonModule, FormsModule, NgTemplateOutlet,NgbNavModule,ReactiveFormsModule,UseraddressComponent,UserpaymentsComponent,UserInfoComponent, UserCredentialsComponent],
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.css'
})
export class UsersettingsComponent {
  active = 'top';
  token:any   //TOKEN SESSION

  //MESE E ANNO DA CONCATENARE
  monthEx:string='' 
  yearEx:string=''

  //Credenziali e password
  credential:Credentials=new Credentials()
  newCred:Credentials=new Credentials()
  newPassword:string=''

  constructor(private http: HttprequestservicesService,
    private auth:AuthServiceService, 
    private route: Router) 
  {
    this.token=sessionStorage.getItem('token')
    this.token=this.auth.getDecodedToken()
    this.http.GetUserInfo().subscribe
        ({
          next: (data: any) => {

          },
          error: (err: any) => {
            console.log("Errore: " + err.status);
          }
        })
        this.GetCredential()       
  }

  GetCredential()
  {
    this.http.GetHttpCredential(this.token.nameid).subscribe
    ({
      next: (data: any) => {
        this.credential = data
      },
      error: (err: any) => {
        console.log("Errore: " + err.status);
      }
    })
  }

  //OPERAZIONI SULL'UTENTE
 

  UpdateCredentialsEmail()
  {
    this.newCred=this.credential
    this.http.PutEmailData(this.token.nameid, this.newCred)
      .subscribe
      ({
        next: (data: any) => {
          
          this.newCred = data;
          console.log(this.newCred)
        },
        error: (error: any) => {
          console.log(error.message);
        }
      })
  }

  UpdateCredentialsPassword()
  {
    this.newCred=this.credential
    this.newCred.password=this.newPassword
    this.http.PutPassawordAlreadyLogged(this.token.nameid, this.newCred)
      .subscribe
      ({
        next: (data: any) => {
          
          this.newCred = data;
          console.log(this.newCred)
        },
        error: (error: any) => {
          console.log(error.message);
        }
      })
  }
  


  GoToUpdateAddress(address:Address)
  {
    sessionStorage.setItem('tmpaddress', address.addressId.toString());
    this.route.navigate(['updateaddress']);
  }
}
