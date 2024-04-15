import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttprequestService } from '../../../shared/services/httprequest.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent 
{
  jsUserID:any;
  constructor(private mainHttp:HttprequestService)
  {}
  GetUserById(id:HTMLInputElement)
  {
    this.mainHttp.GetUserId(parseInt(id.value))
    .subscribe({
      next: (jsData: any) => {
        this.jsUserID = jsData
        
      },
      error: (erreur: any) => {
        console.log(erreur)
      }
    })
  }
}
