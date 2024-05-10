import { Component } from '@angular/core';
import { HttprequestService } from '../../shared/services/httprequest.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  authors: any[] = [];
authorById:any;

  constructor(private http: HttprequestService) {
    this.http.GetJwtAuhtors().subscribe({
      next: (authData: any) => {
        this.authors = authData;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // FindAuthorByID(inpHtml: HTMLInputElement)
  // {
  //   this.http.GetAuhtorById(parseInt(inpHtml.value)).subscribe({
  //     next: (authData: any) => {
  //       this.authorById = authData;
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //   });
  // }

  DeleteAuthorByID(inpHtml: HTMLInputElement)
  {
    this.http.DeleteAuhtorById(parseInt(inpHtml.value)).subscribe({
      next: (authData: any) => {
        //this.authorById = authData;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
