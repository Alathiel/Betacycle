
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
export class EditDialog{
  editResult: boolean = false;
  productDatas: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http:HttprequestservicesService,) {
    this.productDatas = data;
  }
}