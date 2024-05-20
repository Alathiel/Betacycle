import { Component } from '@angular/core';
import { Address } from '../../../../shared/models/address';
import { HttprequestservicesService } from '../../../../shared/services/httprequestservices.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../../shared/services/auth-service.service';
import { AddressPost, user } from '../../../../shared/models/address_post';

@Component({
  selector: 'app-updateaddress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updateaddress.component.html',
  styleUrl: './updateaddress.component.css'
})
export class UpdateaddressComponent {
  newAddress: AddressPost = new AddressPost();
  token: any;

  constructor(private http: HttprequestservicesService, private route: Router, private auth: AuthServiceService) {
    this.token = sessionStorage.getItem('token')
    this.token = this.auth.getDecodedToken()

    this.http.GetHttpAddressById(parseInt(sessionStorage.getItem('tmpaddress')!), this.token.nameid)
      .subscribe
      ({
        next: (data: any) => {
          console.log(data)
          this.newAddress = data;
        },
        error: (error: any) => {
          console.log(error.message);
        }
      })
    sessionStorage.removeItem('tmpaddress');
  }

  PatchAddress() {
    this.newAddress.user = new user();
    this.newAddress.user.firstName = '';
    this.newAddress.user.lastName = '';
    console.log(this.newAddress)
    this.http.PutHttpAddress(this.newAddress)
      .subscribe
      ({
        next: (data: any) => {
          this.newAddress = data;
        },
        error: (error: any) => {
          console.log(error.message);
        }
      })

    this.route.navigate(['usersetting']);
  }

}
