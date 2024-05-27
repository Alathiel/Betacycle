import { Component, Inject } from '@angular/core';
import { AuthCalls } from '../../../../shared/services/auth-calls.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NoAuthCalls } from '../../../../shared/services/noAuth-calls.service';
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
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http:AuthCalls, private httpNoAuth: NoAuthCalls) {
    httpNoAuth.getCategories().subscribe((response) => this.categories = response.$values)
    
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
