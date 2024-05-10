import { Component } from '@angular/core';
import { HttprequestService } from '../../shared/services/httprequest.service';
import { Credentials } from '../../shared/models/credentials';
import { HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product';
import { Model } from '../../shared/models/model';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule, MatPaginatorModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  currentPage: number = 0;

  handlePageEvent(event: PageEvent)
  {
    console.log("handlePageEvent: " + event.pageIndex);
    this.currentPage = event.pageIndex;
  }
}
