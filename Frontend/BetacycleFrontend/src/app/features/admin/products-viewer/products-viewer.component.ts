import { Component } from '@angular/core';
import { HttpServicesService } from '../../../shared/services/http-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowCircleLeft,faPenToSquare, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Route, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NoAuthCalls } from '../../../shared/services/noAuth-calls.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../dialog-template/dialog-template.component';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-products-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './products-viewer.component.html',
  styleUrl: './products-viewer.component.css'
})
export class ProductsViewerComponent {
  logs: any;
  keys: any[] = [];
  selectedValue = "all"
  search = ""
  backIcon = faArrowLeft
  editIcon = faPenToSquare
  constructor(private http: NoAuthCalls, private router: Router, public dialog: MatDialog){
    this.getAllDatas()
  }

  checkValue(l:any): boolean{
    if((typeof l.value === 'object' && !Array.isArray(l.value)) && (l.value === null || l.value !== null))
      return true
    return false;
  }


  redirect(route: string){
    this.router.navigate([route])
  }


  getAllDatas(){
    this.http.getProducts().subscribe({
      next: (jsData:any) => {
        console.log(jsData.body.$values);
        this.logs = jsData.body.$values
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
          this.logs = response.body.$values
          if(response.status == HttpStatusCode.NotFound)
            console.log('aa')
        },
        error: (error:HttpErrorResponse) => {
          console.log(error)
          if(error.status == 404)
            this.logs = undefined
        }
      })
    }
    else
      this.getAllDatas()
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, log:any): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        log,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      console.log('Dialog result: '+ result);
    })
  }

}


  
  

  
