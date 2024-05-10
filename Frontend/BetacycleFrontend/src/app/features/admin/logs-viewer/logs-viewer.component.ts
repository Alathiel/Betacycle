import { Component } from '@angular/core';
import { HttpServicesService } from '../../../shared/services/http-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Route, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-logs-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './logs-viewer.component.html',
  styleUrl: './logs-viewer.component.css'
})
export class LogsViewerComponent {
  logs: any;
  selectedValue = "all"
  search = ""
  backIcon = faArrowCircleLeft
  constructor(private http: HttpServicesService, private router: Router){
    http.getLogs(sessionStorage.getItem('token')+'').subscribe({
      next: (jsData:any) => {
        console.log(jsData.body.$values);
        this.logs = jsData.body.$values
      },
      error: (error:any) => {
        console.log(error);
      }
    })
  }

  filter(){
    this.http.getLogsByFilter(sessionStorage.getItem('token')+'',this.search, this.selectedValue).subscribe({
      next: (jsData:any) => {
        console.log(jsData.body.$values);
        this.logs = jsData.body.$values
      },
      error: (error:any) => {
        console.log(error);
      }
    })
  }

  redirect(route: string){
    this.router.navigate([route])
  }

}
