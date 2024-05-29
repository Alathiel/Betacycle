import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { Output, EventEmitter } from '@angular/core';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent{
  result:boolean = false;
  deleteIcon = faTrash;
  constructor(private sanitizer: DomSanitizer, public dialog: MatDialog, private http:HttprequestservicesService, private router:Router){}
  
  @Input() product:any= ''; 
  @Output() reloadPriceEvent = new EventEmitter<string>();

  Convert(buffer:any) {
    if(buffer!=null)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+buffer);
    return ''
  }

  LessQuantity(){
    if(this.product.quantity>1)
    {
      this.product.quantity -= 1;
      this.product.user = {
        "FirstName": "",
        "LastName": ""
      }
      this.product.product.model = {
        "name": ""
      }
      this.product.product.category = {
        "name": ""
      }
      this.http.PutCart(this.product).subscribe({
        next: (resp:any) =>{
          this.reloadPriceEvent.emit("-");
        }
      })
    }
    else{
      this.confirmDialog('0ms', '0ms')
        
    }
  }

  MoreQuantity(){
    this.product.quantity += 1;
    this.product.user = {
      "FirstName": "",
      "LastName": ""
    }
    this.product.product.model = {
      "name": ""
    }
    this.product.product.category = {
      "name": ""
    }
    this.http.PutCart(this.product).subscribe({
      next: (resp:any) =>{
        this.reloadPriceEvent.emit("+");

      }
    })
  }


  confirmDialog(enterAnimationDuration: string, exitAnimationDuration: string)
  {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
      {
        if(result)
          this.deleteProduct();
      }
    })
  }

  deleteProduct(){
    this.http.DeleteProductFromCart(this.product.product.productId).subscribe({
      next: (resp:any) =>{
        this.http.GetCart().subscribe(resp => {
          this.refreshChildComponent()
        }) 
      }
    })
  }

  refreshChildComponent() {

    // save current route first
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
}
}