
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

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule],
})
/**Just the window to confirm if you are sure to delete product or no */
export class DeleteDialog {
  productDatas: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}