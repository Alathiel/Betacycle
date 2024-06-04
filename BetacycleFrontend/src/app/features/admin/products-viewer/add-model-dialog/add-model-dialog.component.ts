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
import { FormControl, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttprequestservicesService } from '../../../../shared/services/httprequestservices.service';

@Component({
  selector: 'app-add-model-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, CommonModule],
  templateUrl: './add-model-dialog.component.html',
  styleUrl: './add-model-dialog.component.css'
})
export class AddModelDialogComponent {
  models: any
  model:any = {
    modelId: 0,
    name: ''
  };
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http:HttprequestservicesService) {
  http.GetModel().subscribe((response) => this.models = response.$values);
  }

  validate(modelName: NgModel)
  {
    var check = false
    this.models.forEach((element: { name: any; }) => {
      if((element.name).toLowerCase() === (this.model.name).toLowerCase())
        check = true;
    });
    if(modelName.valid && !check)
      return true;
    return false;
  }
}
