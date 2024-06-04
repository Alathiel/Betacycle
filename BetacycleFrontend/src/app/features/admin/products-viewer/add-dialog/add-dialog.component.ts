
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
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpload} from '@fortawesome/free-solid-svg-icons';
import { HttprequestservicesService } from '../../../../shared/services/httprequestservices.service';

@Component({
  selector: 'add-dialog',
  templateUrl: 'add-dialog.component.html',
  styleUrl: './add-dialog.component.css',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, CommonModule, FontAwesomeModule],
})
export class AddDialog{
  uploadIcon = faUpload
  selectedModel = 0
  selectedCategory = 0
  editResult: boolean = false;
  productDatas: any = {
    productName: '',
    color: '',
    description: '',
    insertPrice: '',
    productNumber: '',
    modelId: '',
    categoryId: '',
    weight: '',
    culture: 'en',
    actualPrice: '',
    dateInsert: '2024-04-12',
    lastModify: '2024-04-12',
    thumbnailPhoto: '',
    model:{
      name:''
    },
    category:{
      name:''
    }
  };
  categories: any;
  models: any
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http:HttprequestservicesService) {
    http.getCategories().subscribe((response) => this.categories = response.$values)
    http.GetModel().subscribe((response) => this.models = response.$values);
  }

  validate(name: NgModel, price: NgModel, color: NgModel, description: NgModel, productNumber: NgModel, weight: NgModel, model: NgModel, category: NgModel)
  {
    this.productDatas.actualPrice = price.value
    this.productDatas.modelId = this.selectedModel
    this.productDatas.categoryId = this.selectedCategory
    if(name.valid && price.valid && color.valid && description.valid && productNumber.valid && weight.valid && this.selectedCategory!= 0 && this.selectedModel != 0)
      return true;
    return false;
  } 

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