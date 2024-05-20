import { Component } from '@angular/core';
import { HttpServicesService } from '../../../shared/services/http-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash,faPenToSquare, faHome, faAdd} from '@fortawesome/free-solid-svg-icons';
import { Route, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NoAuthCalls } from '../../../shared/services/noAuth-calls.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from './add-dialog/dialog-template.component';
import { AuthCalls } from '../../../shared/services/auth-calls.service';
import { TOAST_STATE, ToastService } from '../../../shared/services/toast.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { DeleteDialog } from './delete-dialog/dialog-template.component';

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
  totalProducts = 0
  page = 1
  loadedProducts = 0
  backIcon = faHome
  deleteIcon = faTrash
  addIcon = faAdd
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
    this.http.getProducts(this.page).subscribe({
      next: (jsData:any) => {
        console.log(jsData);
        this.products = jsData.body.products.$values
        this.totalProducts = jsData.body.totalProducts
        this.loadedProducts = this.products.length
      },
      error: (error:any) => {
        console.log(error);
      }
    })
  }

  prev(){
    if(this.page > 1)
    {
      this.page--;
      this.filter();
    }
  }

  next(){
    if(this.page < this.totalProducts/10)
    {
      this.page++;
      this.filter();
    }
  }

  filter(temp:string = "aa"){
    if(temp === "bb")
      this.page = 1
    if(this.search !== ""){
      this.http.getFilteredProducts(this.selectedValue, this.search, this.page).subscribe({
        next: (response:any) => {
          console.log(response)
          this.products = response.body.products.$values
          this.totalProducts = response.body.totalProducts
          this.loadedProducts = this.products.length
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

  editDialog(enterAnimationDuration: string, exitAnimationDuration: string, product:any): void {
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

  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, product:any): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
        if(result)
        this.deleteProduct(product)
    })
  }

  AddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      enterAnimationDuration,
      exitAnimationDuration,
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

  deleteProduct(product:any){
    this.httpAuth.deleteProduct(product.productId).subscribe({
      next: (response:any) => {
        //this.toast.showToast(TOAST_STATE.success, 'Operation Completed')
        window.location.reload();
      },
      error: (error:any) => {
        console.log(error)
        this.toast.showToast(TOAST_STATE.error, 'An unexpected error occurred')
      } 
    })
  }

}


  
  

  
