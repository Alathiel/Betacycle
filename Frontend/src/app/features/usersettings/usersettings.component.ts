import { Component, Input, TemplateRef, input } from '@angular/core';
import { Address } from '../../shared/models/address';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { jwtDecode } from 'jwt-decode';
import { FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { User } from '../../shared/models/user';
import { AddressPost } from '../../shared/models/address_post';
import { Route, Router } from '@angular/router';
import { Credentials } from '../../shared/models/credential';
import { RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from '../../shared/models/payment';
import { PaymentPost } from '../../shared/models/payment_post';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-usersettings',
  standalone: true,
  imports: [CommonModule, FormsModule, NgTemplateOutlet,NgbNavModule,ReactiveFormsModule],
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.css'
})
export class UsersettingsComponent {
  active = 'top';
  token:any   //TOKEN SESSION
  //DATI UTENTE
  user:User=new User()  
  newUser:User=new User()

  //MESE E ANNO DA CONCATENARE
  monthEx:string='' 
  yearEx:string=''

  //Credenziali e password
  credential:Credentials=new Credentials()
  newCred:Credentials=new Credentials()
  newPassword:string=''

  //INDIRIZZI 
  getaddress: Address[] = [];
  newAddress:AddressPost=new AddressPost()

  //CARTE DI CREDITO
  getPayment:Payment[]=[]
  newPayment:PaymentPost=new PaymentPost()
  stringCardNumber:string[]=[]

  constructor(private http: HttprequestservicesService,
    private auth:AuthServiceService, 
    private route: Router) 
  {
    this.token=sessionStorage.getItem('token')
    this.token=this.auth.getDecodedToken()
    this.http.GetUserInfo().subscribe
        ({
          next: (data: any) => {

            this.user = data
          },
          error: (err: any) => {
            console.log("Errore: " + err.status);
          }
        })
        this.GetAddresses()
        this.GetCredential()
        this.GetPayment()
   
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
   UpdateUser()
  {
    this.newUser=this.user
    this.http.PutUserData(this.token.nameid, this.newUser)
      .subscribe
      ({
        next: (data: any) => {
          this.newUser = data;
          console.log(this.newUser)
        },
        error: (error: any) => {
          console.log(error.message);
        }
      })
      window.location.reload()
  }

  UpdateCredentialsEmail()
  {
    this.newCred=this.credential
    this.newCred.lastmodified=this.auth.DateNow()
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
    this.newCred.lastmodified=this.auth.DateNow()
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

  //OPERAZIONI SU INDIRIZZI
  GetAddresses()
  {
    this.http.GetHttpAddresses(this.token).subscribe(
      {
        next:(data:any)=>{
          this.getaddress=data.$values
        },
        error:(error:any)=>
          {console.log(error)}
      }
    )
  }

  DeleteAddress(addressid:number,userid:number)
  {
    this.http.DeleteHttpAddresses(addressid,userid).subscribe(
      {
        next:(data:any)=>{

        },
        error:(error:any)=>
          {console.log(error)}
      }
    )
    window.location.reload()
  }
  //Aggiungi un nuovo indirizzo
  AddAddress()
  {   
    this.http.PostHttpAddress(this.newAddress).subscribe(
      {
        next:(data:any)=>{
          console.log(data)
        },
        error:(error:any)=>
          {console.log(error.message)}
      }
    )
    window.location.reload()
  }
  //Payment Option. GET PUT DELETE POST
  GetPayment()
  {
    this.http.GetHttpPaymentById().subscribe(
      {
        next:(data:any)=>{
          this.getPayment=data.$values
        },
        error:(error:any)=>
          {console.log(error.message)}
      }
    )  
  }
  DeletePayment(idPayment:number)
  {
    this.http.DeleteHttpPayment(this.token.nameid,idPayment).subscribe(
      {
        next:(data:any)=>{

        },
        error:(error:any)=>
          {console.log(error)}
      }
    )   
    window.location.reload() 
  }
  AddPayment(month:NgModel,year:NgModel)
  {

    this.newPayment.expirationDate='20'+year.value+'-'+month.value+'-'+'01'
    this.newPayment.user.lastmodified=this.newPayment.expirationDate
    

    switch(this.newPayment.numberCard.at(0))
    {
      case '3':
        this.newPayment.circuitCard='American Express'
        break;
        case '4':
        this.newPayment.circuitCard='VISA'
        break;
        case '5':
        this.newPayment.circuitCard='Mastercard'
        break;
    }
    this.newPayment.userId=this.token.nameid
    console.log(this.newPayment)
    this.http.PostHttpPayment(this.newPayment).subscribe(
      {
        next:(data:any)=>{
          console.log(data)
        },
        error:(error:any)=>
          {console.log(error.message)}
      }
    )
  
    window.location.reload()
  }


  GoToUpdateAddress(address:Address)
  {
    sessionStorage.setItem('tmpaddress', address.addressId.toString());
    this.route.navigate(['updateaddress']);
  }
}
