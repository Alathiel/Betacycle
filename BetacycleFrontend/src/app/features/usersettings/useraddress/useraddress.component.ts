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
  styleUrl: './useraddress.component.css',
})
/**
 * All the function need for the CRUD of addresses
 * @param getaddress array with all the address of the user
 * @param newAddress info with the new address
 */
export class UseraddressComponent {
  getaddress: Address[] = [];
  newAddress: AddressPost = new AddressPost();

  //Fill the with all the addresses the user has
  constructor(
    private http: HttprequestservicesService,
    private auth: AuthServiceService,
    private route: Router
  ) {
    this.http.GetHttpAddresses().subscribe({
      next: (data: any) => {
        this.getaddress = data.$values;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  /**Delete Address */
  DeleteAddress(addressId: number) {
    this.http.DeleteHttpAddresses(addressId).subscribe({
      next: (data: any) => {
    window.location.reload();

      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  /**Add new address */
  AddAddress() {
    this.http.PostHttpAddress(this.newAddress).subscribe({
      next: (data: any) => {
        console.log(data);
    window.location.reload();

      },
      error: (error: any) => {
        console.log(error.message);
      },
    });

  }
  /** Redirect in the page for modify address info*/
  GoToUpdateAddress(address: Address) {
    sessionStorage.setItem('tmpaddress', address.addressId.toString());
    this.route.navigate(['updateaddress']);
  }
}
