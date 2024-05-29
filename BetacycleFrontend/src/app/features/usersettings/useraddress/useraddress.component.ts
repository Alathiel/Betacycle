import { Component } from '@angular/core';
import { Address } from '../../../shared/models/address';
import { AddressPost } from '../../../shared/models/address_post';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
@Component({
  selector: 'app-useraddress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './useraddress.component.html',
  styleUrl: './useraddress.component.css'
})
export class UseraddressComponent {
  token:any
  getaddress: Address[] = [];
  newAddress:AddressPost=new AddressPost()
  
  constructor(private http: HttprequestservicesService,
    private auth:AuthServiceService, 
    private route: Router) 
  {
        this.GetAddresses()
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
GoToUpdateAddress(address:Address)
  {
    sessionStorage.setItem('tmpaddress', address.addressId.toString());
    this.route.navigate(['updateaddress']);
  }
}