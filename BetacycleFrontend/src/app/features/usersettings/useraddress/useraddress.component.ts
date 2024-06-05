import { Component } from '@angular/core';
import { Address } from '../../../shared/models/address';
import { AddressPost } from '../../../shared/models/address_post';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from './add-address/add-address.component';
import { TOAST_STATE, ToastService } from '../../../shared/services/toast.service';
import { timer } from 'rxjs';

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
  updateAddress:AddressPost=new AddressPost()
  newAddress: AddressPost = new AddressPost();
  //Fill the with all the addresses the user has
  constructor(
    private http: HttprequestservicesService,
    private route: Router,
    private dialog:MatDialog,
    private toast:ToastService
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

  /** Redirect in the page for modify address info*/
  GoToUpdateAddress(address: Address,enterAnimationDuration: string, exitAnimationDuration: string) {
    // sessionStorage.setItem('tmpaddress', address.addressId.toString());
    // this.route.navigate(['updateaddress']);
    const dialogRef = this.dialog.open(UpdateAddressComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: address,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
      {
        if(result)
          {
            this.updateAddress=result.updateAddress
            console.log(this.updateAddress)
            this.http.PutHttpAddress(this.updateAddress)
        .subscribe
        ({
          next: (data: any) => {
          console.log(data)
          
            this.toast.showToast(TOAST_STATE.success, 'Aggiornamento eseguito con successo')
        },
        error: (error: any) => {
          console.log(error.message);
          this.toast.showToast(TOAST_STATE.error, 'Errore inserimento dati')
          timer(10)
        }
      })
    }
        else
          this.toast.showToast(TOAST_STATE.error, 'An unexpected error occurred')
      }
    })

  }

  /**Adding new address in Dialog window */
  AddAddressDialog(enterAnimationDuration: string, exitAnimationDuration: string)
  {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
      {
        if(result.state)
        {
          console.log(result.newAddress)
        this.http.PostHttpAddress(result.newAddress).subscribe({
          next: (data: any) => {
            console.log(data);
        window.location.reload();
    
          },
          error: (error: any) => {
            console.log(error.message);
          },
        })
      }
        else
          this.toast.showToast(TOAST_STATE.error, 'Errore imprevisto nell inserimento')
      }
    })
  }
}
