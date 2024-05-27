import { Component } from '@angular/core';
import { Credentials } from '../../shared/models/credential';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepsw',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './updatepsw.component.html',
  styleUrl: './updatepsw.component.css'
})
export class UpdatepswComponent {
  token:any
  credentials:Credentials=new Credentials
  changePassword:string=''
  confermaPassword:string=''
  constructor(private auth:AuthServiceService, private http:HttprequestservicesService,private route:Router)
  {
      this.token=auth.getDecodedTokenUpdate(sessionStorage.getItem('tmptoken')!)
        sessionStorage.removeItem('tmptoken')
      this.credentials.email=this.token.email
        
  }
  ChangePassword(frm:NgForm)
  {
    this.changePassword=frm.value.changePassword
    this.confermaPassword=frm.value.confermaPassword
    
    if(this.changePassword==this.confermaPassword)
      {
        this.credentials.password=this.changePassword 
        this.credentials.userId=this.token.nameid
        this.http.PacthPassword(this.credentials).subscribe(
          {
            next:(data:any)=>
            {
              console.log(data)
              this.route.navigate(['/login'])
            },
            error(error:any)
            {
              console.log(error)
            }
          }
        
        )
      }
      else
      {
        alert('Le password non coincidono')
      }
    
 }
}
