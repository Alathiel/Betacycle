
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
import { AuthCalls } from '../../../../shared/services/auth-calls.service';
import { FormsModule } from '@angular/forms';

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
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http:AuthCalls,) {
    this.productDatas = data;
  }
}