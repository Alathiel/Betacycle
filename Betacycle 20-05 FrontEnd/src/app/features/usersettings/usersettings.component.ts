import { Component, TemplateRef } from '@angular/core';
import { Address } from '../../shared/models/address';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { jwtDecode } from 'jwt-decode';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { User } from '../../shared/models/user';
import { AddressPost } from '../../shared/models/address_post';
import { Route, Router } from '@angular/router';
import { Credentials } from '../../shared/models/credential';
import { AfterContentInit,ContentChildren } from '@angular/core';

@Component({
  selector: 'app-usersettings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.css'
})
export class UsersettingsComponent {
  token:any
  user:User=new User()
  newUser: User = new User();
  credential:Credentials = new Credentials()
  newCred:Credentials = new Credentials()
  newPassword: string = ''
  getaddress: Address[] = [];
  newAddress:AddressPost = new AddressPost()
  


  constructor(private http: HttprequestservicesService,
    private auth:AuthServiceService, 
    private route: Router,
    /*private headerTemplate:TemplateRef<any>*/) 
  {
    //window.location.reload()
    this.token=sessionStorage.getItem('token')
    this.token=this.auth.getDecodedToken()
    this.http.GetUserInfo().subscribe
        ({
          next: (data: any) => {
            this.user = data;
            this.newUser = data;
          },
          error: (err: any) => {
            console.log("Errore: " + err.status);
          }
        })
        this.GetAddresses()
        this.GetCredential()
  }

  UpdateCredentialsEmail()
  {
    this.http.PutCredentialData(this.token.nameid, this.newCred)
      .subscribe
      ({
        next: (data: any) => {
          this.newCred = data;
        },
        error: (error: any) => {
          console.log(error.message);
        }
      })

      window.location.reload();
  }

  UpdateCredentialsPassword() {
    if (this.newPassword != '') {
      this.newCred.password = this.newPassword;
      this.http.PutCredentialPassword(this.token.nameid, this.newCred)
        .subscribe
        ({
          next: (data: any) => {
            this.newCred = data;
          },
          error: (error: any) => {
            console.log(error.message);
          }
        })

      window.location.reload();
    }
    else {
      alert("Scrivere la Password!");
    }
  }

  UpdateUser()
  {
    this.http.PutUserData(this.token.nameid, this.newUser)
      .subscribe
      ({
        next: (data: any) => {
          this.newUser = data;
        },
        error: (error: any) => {
          console.log(error.message);
        }
      })

      window.location.reload();
  }

  GetCredential()
  {
    this.http.GetHttpCredential(this.token.nameid).subscribe
    ({
      next: (data: any) => {
        this.credential = data
        this.newCred = data
      },
      error: (err: any) => {
        console.log("Errore: " + err.status);
      }
    })
  }

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
          console.log(data)
        },
        error:(error:any)=>
          {console.log(error)}
      }
    )
    window.location.reload()
  }

  AddAddress()
  {
    this.newAddress.userId=this.token.nameid
    this.http.PostHttpAddress(this.newAddress).subscribe(
      {
        next:(data:any)=>{
          console.log(data)
          console.log(this.newAddress)
        },
        error:(error:any)=>
          {console.log(error.message)}
      }
    )

    window.location.reload();
    
  }

  GoToUpdateAddress(address: Address)
  {
    sessionStorage.setItem('tmpaddress', address.addressId.toString());
    this.route.navigate(['updateaddress']);
  }
}
