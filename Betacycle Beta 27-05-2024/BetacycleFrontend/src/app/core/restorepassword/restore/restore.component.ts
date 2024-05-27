import { Component } from '@angular/core';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { Credentials } from '../../../shared/models/credential';
import { HttpStatusCode } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { loginservice } from '../../../shared/services/loginservice.service';

@Component({
  selector: 'app-restore',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './restore.component.html',
  styleUrl: './restore.component.css'
})
export class RestoreComponent {
  credentials:Credentials=new Credentials()
  constructor(private http:HttprequestservicesService, private logservice:loginservice,public router: Router, private AuthService:AuthServiceService)
  {}
  RestoreData()
  {
    this.AuthService.RestoreHttpPassword(this.credentials).subscribe(
      {
        next:(data:any)=>
        {
          alert("Password modificata con successo")
          this.router.navigate(['/login'])
        },
        error(error:any)
        {
          console.log(error)
          
        }
      }   
    )
  }
}

