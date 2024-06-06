import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPaymentModalComponent } from './add-payment-modal/add-payment-modal.component';
import { TOAST_STATE, ToastService } from '../../shared/services/toast.service';
import { FormsModule } from '@angular/forms';
import { PaymentPost } from '../../shared/models/payment_post';
import { AddressPost } from '../../shared/models/address_post';
import { AddAddressModalComponent } from './add-address-modal/add-address-modal.component';
import { Order } from '../../shared/models/order';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.css'
})
/**Confirm the order */
export class ConfirmOrderComponent {
  constructor(private http:HttprequestservicesService, private router:Router, token: AuthServiceService,public dialog: MatDialog, private toast:ToastService){
    if(!token.getLoginStatus() || !token.checkUser())
      router.navigate(['login']);
  }
  loaded = false;
  totalPrice:number = 0;
  cart:any;
  orderCompleted = false;
  cards: PaymentPost[] = []
  addresses: AddressPost [] = []
  cardsLoaded = false;
  addressesLoaded = false;
  selectedAddress: any;
  selectedCard:any
  order: Order[] = [];


  /**Showing the actual cart of the user */
  ngOnInit()
  {
    this.http.GetCart().subscribe({
      next:(resp:any) =>{
        this.cart = resp.body;
        console.log(this.cart)
        this.cart.forEach((product:any) => {
          this.totalPrice += product.quantity * product.product.actualPrice
        });
        this.loaded = true;
      },
    })
  }

  getPayments(){
    this.http.GetHttpPayments().subscribe({
      next: (resp:any) => {
        this.cards = resp.$values
        this.cardsLoaded = true;
      },
      error: (error:any) => {
        console.log(error)
      }
    })
  }

  getAddresses(){
    this.http.GetHttpAddresses().subscribe({
      next: (resp:any) => {
        this.addresses = resp.$values
        this.addressesLoaded = true;
      },
      error: (error:any) => {
        console.log(error)
      }
    })
  }

  selectPayment(id:any){
    this.selectedCard = id
    
  }

  selectAddress(id:any){
    this.selectedAddress = id
  }
  completeOrder(){
    this.cart.forEach((product:any) => {
      console.log(product)
      delete product.product.carts
      delete product.product.$id
      product.product.model = {name: ''}
      product.product.category = {name: ''}
      this.order.push({
        userId: product.userId,
        productId: product.productId,
        quantity: product.quantity,
        productPrice: product.product.actualPrice,
        idPayment: this.selectedCard,
        addressId: this.selectedAddress,
        status: 'Storage',
        transactionId: 0,
        transaction: {},
        orderId: 0,
        product: product.product
      })
    });
    this.http.ConfirmOrder(this.order).subscribe({
      next: (resp:any) => this.orderCompleted = true,
      error: (error:any) => {
        console.log(error)
      }
    })
    
  }

  addPayment(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddPaymentModalComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
      {
        if(result.state)
        {
          this.http.PostHttpPayment(result.newPayment).subscribe({
            next: (data: any) => {
              const currentRoute = this.router.url;
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
          }); 
            },
            error: (error: any) => {
              console.log(error.message);
              this.toast.showToast(TOAST_STATE.error, error.error)
            },
          });
        }
        else
        {
          this.toast.showToast(TOAST_STATE.error, "An unexpected error occurred.")
        }
      }
    })
  }

  addAddress(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddAddressModalComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
      {
        if(result.state)
        {
          this.http.PostHttpAddress(result.newAddress).subscribe({
            next: (data: any) => {
              const currentRoute = this.router.url;
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
          }); 
            },
            error: (error: any) => {
              console.log(error.message);
              this.toast.showToast(TOAST_STATE.error, error.error)
            },
          });
        }
        else
        {
          this.toast.showToast(TOAST_STATE.error, "An unexpected error occurred.")
        }
      }
    })
  }
}
