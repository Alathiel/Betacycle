import { Component, Inject } from '@angular/core';
import { MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose} from '@angular/material/dialog';
  import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';

@Component({
  selector: 'app-dialog-template',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './dialog-template.component.html',
  styleUrl: './dialog-template.component.css'
})
export class DialogTemplateComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogTemplateComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
