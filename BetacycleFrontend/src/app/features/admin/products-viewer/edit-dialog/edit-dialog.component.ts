
import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttprequestservicesService } from '../../../../shared/services/httprequestservices.service';

@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule],
})
/**Window for delete product */
export class EditDialog{
  editResult: boolean = false;
  productDatas: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http:HttprequestservicesService,) {
    this.productDatas = data;
  }
  /** Show all details of the product to modify*/
  getBase64(event:any) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      var temp:any = reader.result;
      me.productDatas.thumbnailPhoto = temp.substring(temp.indexOf(",")+1)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}