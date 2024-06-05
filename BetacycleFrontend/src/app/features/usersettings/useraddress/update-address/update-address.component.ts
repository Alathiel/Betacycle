import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Address } from '../../../../shared/models/address';
import { AddressPost, user } from '../../../../shared/models/address_post';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-update-address',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, CommonModule],
  templateUrl: './update-address.component.html',
  styleUrl: './update-address.component.css'
})

/**Update address component
 * Injecting the data from UserAddress
 */
export class UpdateAddressComponent {
  
  updateAddress:AddressPost=new AddressPost()

  constructor(@Inject(MAT_DIALOG_DATA) public data:AddressPost)
  {
    this.updateAddress=data
    this.updateAddress.user=new user()
    this.updateAddress.user.firstName=''
    this.updateAddress.user.lastName=''
    console.log(this.updateAddress)
  }
}
