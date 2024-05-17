import { Component } from '@angular/core';
import { HttpServicesService } from '../../../shared/services/http-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash,faPenToSquare, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Route, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NoAuthCalls } from '../../../shared/services/noAuth-calls.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../dialog-template/dialog-template.component';
import { AuthCalls } from '../../../shared/services/auth-calls.service';
import { TOAST_STATE, ToastService } from '../../../shared/services/toast.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-products-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, ToastComponent],
  templateUrl: './products-viewer.component.html',
  styleUrl: './products-viewer.component.css'
})
export class ProductsViewerComponent {
  products: any;
  keys: any[] = [];
  selectedValue = "all"
  search = ""
  backIcon = faArrowLeft
  deleteIcon = faTrash
  editIcon = faPenToSquare
  constructor(private http: NoAuthCalls, private router: Router, public dialog: MatDialog, private httpAuth: AuthCalls, private toast: ToastService){
    this.getAllDatas()
  }

  checkValue(l:any): boolean{
    if((typeof l.value === 'object' && !Array.isArray(l.value)) && (l.value === null || l.value !== null))
      return true
    return false;
  }


  redirect(route: string){
    this.toast.dismissToast()
    this.router.navigate([route])
  }


  getAllDatas(){
    this.http.getProducts().subscribe({
      next: (jsData:any) => {
        console.log(jsData.body.$values);
        this.products = jsData.body.$values
      },
      error: (error:any) => {
        console.log(error);
      }
    })
  }

  filter(){
    if(this.search !== ""){
      this.http.getFilteredProducts(this.selectedValue, this.search).subscribe({
        next: (response:any) => {
          console.log(response)
          this.products = response.body.$values
          if(response.status == HttpStatusCode.NotFound)
            console.log('aa')
        },
        error: (error:HttpErrorResponse) => {
          console.log(error)
          if(error.status == 404)
            this.products = undefined
        }
      })
    }
    else
      this.getAllDatas()
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, product:any): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: product,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
        if(result.state)
        this.editProduct(result)
    })
  }

  editProduct(result:any){
    result.productDatas.category = {categoryId:0,name:''}
    result.productDatas.model = {modelId:0,name:''}
    this.httpAuth.putProduct(result.productDatas).subscribe({
      next: (response:any) => {
        this.toast.showToast(TOAST_STATE.success, 'Operation Completed')
      },
      error: (error:any) => {
        console.log(error)
        this.toast.showToast(TOAST_STATE.error, 'An unexpected error occurred')
      }
    })
  }

}


  
  

  
