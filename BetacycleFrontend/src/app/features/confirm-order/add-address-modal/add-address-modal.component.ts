import { Component, Inject } from '@angular/core';
import { UserpaymentsComponent } from '../../usersettings/userpayments/userpayments.component';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddressPost } from '../../../shared/models/address_post';


@Component({
  selector: 'app-add-address-modal',
  standalone: true,
  imports: [FormsModule, MatDialogActions, MatDialogContent, MatDialogClose],
  templateUrl: './add-address-modal.component.html',
  styleUrl: './add-address-modal.component.css'
})
export class AddAddressModalComponent {
  newAddress: AddressPost = new AddressPost();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttprequestservicesService
  ) {}

  validate(form: any) {
    if (form.valid)
      return true;
    return false;
  }
}
