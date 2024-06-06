import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AddressPost } from '../../../../shared/models/address_post';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PaymentPost } from '../../../../shared/models/payment_post';
import { TOAST_STATE, ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-add-payment',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, CommonModule],
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css'
})
export class AddPaymentComponent {

  newPayment: PaymentPost = new PaymentPost()
  constructor(private toast:ToastService)
  {}

  Check(year: NgModel, month: NgModel) {
    if (this.newPayment.numberCard.at(0) == '3' || this.newPayment.numberCard.at(0) == '4' || this.newPayment.numberCard.at(0) == '5') {

      if (parseInt(year.value) >= 25 && parseInt(month.value) <= 12) {
        this.newPayment.expirationDate = '20' + year.value + '-' + month.value + '-' + '01'
        this.newPayment.user.lastmodified = this.newPayment.expirationDate
        switch (this.newPayment.numberCard.at(0)) {
          case '3':
            this.newPayment.circuitCard = 'American Express'
            break;
          case '4':
            this.newPayment.circuitCard = 'VISA'
            break;
          case '5':
            this.newPayment.circuitCard = 'Mastercard'
            break;
        }
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

}
