import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Route, Router, RouterModule } from '@angular/router';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';


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
  currentLogs = 0;
  totalLogs = 0
  logsLoaded = 0;
  page = 1
  backIcon = faHome
  loggingState = true;
  constructor(private http: HttprequestservicesService, private router: Router){
    this.http.GetLoggingState().subscribe({
      next: (response:any) => {
        this.loggingState = response
      },
      error: (error:any) => {
        console.log(error);
      }
    });
    this.getAllLogs();
  }

  filter(temp:string = 'a'){
    if(temp === 'b'){
      this.page = 1}
    if(this.selectedValue === "all")
      this.getAllLogs();
    else
    {
      this.http.getLogsByFilter(this.search, this.selectedValue, this.page).subscribe({
        next: (jsData:any) => {
            this.logs = jsData.body.logs.$values
            this.logsLoaded = this.logs.length
            this.totalLogs = jsData.body.totalLogs
        },
        error: (error:any) => {
          console.log(error);
        }
      })
    }
  }

  toggleLogging(){
    this.http.toggleLogging().subscribe((response) => console.log(response));
    this.http.GetLoggingState().subscribe((response) => this.loggingState = response)
  }

  prev(){
    if(this.page > 1)
    {
      this.page--;
      this.filter();
    }
  }

  next(){
    if(this.page < this.totalLogs/10)
    {
      this.page++;
      this.filter();
    }
  }

  getAllLogs(){
    this.http.getLogs(this.page).subscribe({
      next: (jsData:any) => {
        this.logs = jsData.body.logs.$values
        console.log(this.logs)
        this.logsLoaded = this.logs.length
        this.totalLogs = jsData.body.totalLogs
        
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
