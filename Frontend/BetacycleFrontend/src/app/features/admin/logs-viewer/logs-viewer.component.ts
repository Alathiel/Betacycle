import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthCalls } from '../../../shared/services/auth-calls.service';


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
  backIcon = faArrowLeft
  constructor(private http: AuthCalls, private router: Router){
    http.getLogs().subscribe({
      next: (jsData:any) => {
        this.logs = jsData.body.$values
      },
      error: (error:any) => {
        console.log(error);
      }
    })
  }

  filter(){
    if(this.selectedValue === "all")
      this.http.getLogs().subscribe((resp) => {this.logs = resp.body.$values})
    else
    {
      this.http.getLogsByFilter(this.search, this.selectedValue).subscribe({
        next: (jsData:any) => {
            this.logs = jsData.body.$values
        },
        error: (error:any) => {
          console.log(error);
        }
      })
    }
  }

  redirect(route: string){
    this.router.navigate([route])
  }

}
