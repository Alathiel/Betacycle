import { Component } from '@angular/core';
import { Payment } from '../../../shared/models/payment';
import { PaymentPost } from '../../../shared/models/payment_post';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog,MatDialogTitle } from '@angular/material/dialog';
import { ToastService, TOAST_STATE } from '../../../shared/services/toast.service';
import { timer } from 'rxjs';
import { AddPaymentComponent } from './add-payment/add-payment.component';

@Component({
  selector: 'app-userpayments',
  standalone: true,
  imports: [CommonModule, FormsModule,MatDialogTitle],
  templateUrl: './userpayments.component.html',
  styleUrl: './userpayments.component.css'
})

/**
 * All the function need for the CRUD of payment methods
 * @param getPayment All the credit card the user ha
 * @param newPayment Data of the new payment to insert
 */
export class UserpaymentsComponent {
  getPayment: Payment[] = []
  newPayment: PaymentPost = new PaymentPost()
  constructor(private http: HttprequestservicesService, private dialog: MatDialog, private toast: ToastService) {
    //Fill get payment with the payment methods of the user
    this.http.GetHttpPayments().subscribe(
      {
        next: (data: any) => {
          this.getPayment = data.$values
        },
        error: (error: any) => { console.log(error.message) }
      }
    )
  }

  /**Delete a payment method*/
  DeletePayment(idPayment: number) {
    this.http.DeleteHttpPayment(idPayment).subscribe(
      {
        next: (data: any) => {
          window.location.reload()
        },
        error: (error: any) => { console.log(error) }
      }
    )
  }

  /**Adding new payment in Dialog window */
  AddPaymentDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(AddPaymentComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.state) {
          this.http.PostHttpPayment(result.newPayment).subscribe({
            next: (data: any) => {
              this.toast.showToast(TOAST_STATE.success, 'Metodo di pagamento inserito con successo')
              timer(3)
              window.location.reload();
            },
            error: (error: any) => {
              console.log(error.message);
              this.toast.showToast(TOAST_STATE.error, 'Errore imprevisto nell inserimento')
            },
          })
        }
        else
          this.toast.showToast(TOAST_STATE.error, 'Errore imprevisto nell inserimento')
      }
    })
  }
}
