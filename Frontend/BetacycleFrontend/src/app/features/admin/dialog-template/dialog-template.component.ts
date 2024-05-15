
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
import { DialogData } from '../products-viewer/products-viewer.component';

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-template.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data)
  }
}