import { Component } from '@angular/core';
import { Payment } from '../../../shared/models/payment';
import { PaymentPost } from '../../../shared/models/payment_post';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-userpayments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './userpayments.component.html',
  styleUrl: './userpayments.component.css'
})
export class UserpaymentsComponent {
  getPayment: Payment[] = []
  newPayment: PaymentPost = new PaymentPost()
  stringCardNumber: string[] = []
  constructor(private http: HttprequestservicesService,
    private auth: AuthServiceService,
    private route: Router) {
      this.http.GetHttpPaymentById().subscribe(
        {
          next: (data: any) => {
            this.getPayment = data.$values
          },
          error: (error: any) => { console.log(error.message) }
        }
      )
  }

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
  AddPayment(month: NgModel, year: NgModel) {
    if (this.newPayment.numberCard.at(0) == '3' || this.newPayment.numberCard.at(0) == '4' || this.newPayment.numberCard.at(0) == '5') 
    {
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
      this.http.PostHttpPayment(this.newPayment).subscribe(
        {
          next: (data: any) => {
            console.log(data)
            window.location.reload()
          },
          error: (error: any) => { console.log(error.message) }
        }
      )
    }
    else
    {
      alert("Inserire una carta valida")
    }
  }
}
