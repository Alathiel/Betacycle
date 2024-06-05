import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash,faPenToSquare, faHome, faAdd} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddDialog } from './add-dialog/add-dialog.component';
import { TOAST_STATE, ToastService } from '../../../shared/services/toast.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { DeleteDialog } from './delete-dialog/delete-dialog.component';
import { EditDialog } from './edit-dialog/edit-dialog.component';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { AddModelDialogComponent } from './add-model-dialog/add-model-dialog.component';
import { NgOptimizedImage } from '@angular/common'
import { DomSanitizer } from '@angular/platform-browser';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { NavbarServiceService } from '../../../shared/services/navbar-service.service';
import { FootServiceService } from '../../../shared/services/foot-service.service';

@Component({
  selector: 'app-products-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, ToastComponent, NgOptimizedImage],
  templateUrl: './products-viewer.component.html',
  styleUrl: './products-viewer.component.css'
})
/**Admin managment of the product */
export class ProductsViewerComponent {
  /**
   * @param products List with all the products get from db
   * @param selectedValue Filter used for name
   * @param search Search value 
   * @param totalProducts Total of products returned form the get calls
   * @param page Need to show products in sequence
   * @param loadedProducts Number of products
   * @param byname Input from the user to research by name
   */
  products: any;
  selectedValue = "all"
  search = ""
  totalProducts = 0
  page = 1
  loadedProducts = 0
  backIcon = faHome
  deleteIcon = faTrash
  addIcon = faAdd
  editIcon = faPenToSquare

  constructor(private http: HttprequestservicesService, private router: Router, public dialog: MatDialog, private toast: ToastService,private sanitizer: DomSanitizer, token:AuthServiceService, navService:NavbarServiceService, footServ: FootServiceService){
    /**Access only if you are an admin
     * Hide the normal navigation bar and footer
     */
    navService.hide();
    footServ.hide();
    if(!token.getLoginStatus() || !token.checkAdmin())
      this.router.navigate(['admin-login']);
    this.getAllDatas()
  }

  /**Function for convert and show images */
  checkValue(l:any): boolean{
    if((typeof l.value === 'object' && !Array.isArray(l.value)) && (l.value === null || l.value !== null))
      return true
    return false;
  }
  convert(buffer:any) {
    if(buffer!=null)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+buffer);
    return ''
  }

  /**Redirect function  */
  redirect(route: string){
    this.toast.dismissToast()
    this.router.navigate([route])
  }

  /**Loading all product in db */
  getAllDatas(){
    this.http.GetProducts(this.page).subscribe({
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

  /**Previous and next page */
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

  /**Filter research */
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

  /**Function access window of edit product */
  editDialog(enterAnimationDuration: string, exitAnimationDuration: string, product:any): void {
    const dialogRef = this.dialog.open(EditDialog, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: product,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
      {
        if(result.state)
          this.editProduct(result)
        else
          this.toast.showToast(TOAST_STATE.error, 'An unexpected error occurred')
      }
    })
  }

  /**Function access window of delete product */
  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, product:any): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
      {
        if(result)
          this.deleteProduct(product)
        else
          this.toast.showToast(TOAST_STATE.error, 'An unexpected error occurred')
      }
    })
  }

  /**Function access window of edit product of add product */
  AddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddDialog, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
      {
        if(result.state)
          this.addProduct(result.productDatas)
        else
          this.toast.showToast(TOAST_STATE.error, 'An unexpected error occurred')
      }
    })
  }

  /**Function access window of edit product of add category */
  AddCategoryDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
      {
        if(result.state)
          this.addCategory(result.category)
        else
          this.toast.showToast(TOAST_STATE.error, 'An unexpected error occurred')
      }
    })
  }

  /**Function access window of edit product of add model */
  AddModelDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddModelDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
      {
        if(result.state)
          this.addModel(result.model)
        else
          this.toast.showToast(TOAST_STATE.error, 'An unexpected error occurred')
      }
    })
  }
  /**Add model on db */
  addModel(model:any){
    this.http.AddModel(model).subscribe({
      next: (response:any) => {
        this.toast.showToast(TOAST_STATE.success, 'Operation Completed')
      },
      error: (error:any) => {
        console.log(error)
        this.toast.showToast(TOAST_STATE.error, 'An unexpected error occurred')
      }
    })
  }

  /**Add category on db */
  addCategory(category:any){
    this.http.AddCategory(category).subscribe({
      next: (response:any) => {
        this.toast.showToast(TOAST_STATE.success, 'Operation Completed')
      },
      error: (error:any) => {
        console.log(error)
        this.toast.showToast(TOAST_STATE.error, 'An unexpected error occurred')
      }
    })
  }

  /**Modify product on db */
  editProduct(result:any){
    result.productDatas.category = {categoryId:0,name:''}
    result.productDatas.model = {modelId:0,name:''}
    this.http.PutProduct(result.productDatas).subscribe({
      next: (response:any) => {
        this.toast.showToast(TOAST_STATE.success, 'Operation Completed')
      },
      error: (error:any) => {
        console.log(error)
        this.toast.showToast(TOAST_STATE.error, 'An unexpected error occurred')
      }
    })
  }

  /**Delete product on db */
  deleteProduct(product:any){
    this.http.DeleteProduct(product.productId).subscribe({
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

  /**Add product on db */
  addProduct(product:any){
    this.http.AddProduct(product).subscribe({
      next: (response:any) => {
        this.toast.showToast(TOAST_STATE.success, 'Operation Completed refresh to see changes')
      },
      error: (error:any) => {
        console.log(error)
        this.toast.showToast(TOAST_STATE.error, 'An unexpected error occurred')
      } 
    })
  }



}


  
  

  
