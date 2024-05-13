import { Component } from '@angular/core';
import { HttpServicesService } from '../../../shared/services/http-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowCircleLeft,faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './products-viewer.component.html',
  styleUrl: './products-viewer.component.css'
})
export class ProductsViewerComponent {
  logs: any;
  keys: any[] = [];
  selectedValue = "all"
  search = ""
  backIcon = faArrowCircleLeft
  editIcon = faPenToSquare
  constructor(private http: HttpServicesService, private router: Router){
    http.getProducts(sessionStorage.getItem('token')+'').subscribe({
      next: (jsData:any) => {
        console.log(jsData.body.$values);
        this.logs = jsData.body.$values
        
        // var map = new Map(this.logs[0]);
        // console.log(map)
        // this.logs.forEach((k:any) => 
        //   this.keys.push(Object.keys(k)
        // ))
        console.log(this.keys)
      },
      error: (error:any) => {
        console.log(error);
      }
    })
  }

  checkValue(l:any): boolean{
    if((typeof l.value === 'object' && !Array.isArray(l.value)) && (l.value === null || l.value !== null))
      return true
    return false;
  }


  redirect(route: string){
    this.router.navigate([route])
  }

  test(){
    alert('aaa')
  }

}


  
  

  
