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
import { PaymentPost } from '../../../shared/models/payment_post';

@Component({
  selector: 'app-add-payment-modal',
  standalone: true,
  templateUrl: './add-payment-modal.component.html',
  styleUrl: './add-payment-modal.component.css',
  imports: [
    UserpaymentsComponent,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
  ],
})
export class AddPaymentModalComponent {
  newPayment: PaymentPost = new PaymentPost();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttprequestservicesService
  ) {}

  validate(form: any, month: any, year: any) {
    if (form.valid && (this.newPayment.numberCard.at(0) == '3' ||this.newPayment.numberCard.at(0) == '4' || this.newPayment.numberCard.at(0) == '5'))
    {
      this.newPayment.expirationDate =
        '20' + year.value + '-' + month.value + '-' + '01';
      this.newPayment.user.lastmodified = this.newPayment.expirationDate;

      switch (this.newPayment.numberCard.at(0)) {
        case '3':
          this.newPayment.circuitCard = 'American Express';
          break;
        case '4':
          this.newPayment.circuitCard = 'VISA';
          break;
        case '5':
          this.newPayment.circuitCard = 'Mastercard';
          break;
      }
      return true;
    }

    return false;
  }
}
