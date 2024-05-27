import { Component, Inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
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
import { HttprequestservicesService } from '../../../../shared/services/httprequestservices.service';

@Component({
  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, FormsModule, MatDialogClose, MatButton, MatDialogTitle],
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.css'
})
export class AddCategoryDialogComponent {
  categories: any = [];
  category: any = {
    name: '',
    categoryId: 0
  }
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http:HttprequestservicesService) {
    http.getCategories().subscribe((response) => this.categories = response.$values)
    
  }

  validate(category: NgModel)
  {
    var check = false
    this.categories.forEach((element: { name: any; }) => {
      if((element.name).toLowerCase() === (this.category.name).toLowerCase())
        check = true;
    });
    if(category.valid && !check)
      return true;
    return false;
  }
}
