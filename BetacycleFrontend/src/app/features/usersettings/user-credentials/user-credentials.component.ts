import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Credentials } from '../../../shared/models/credential';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { TOAST_STATE, ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-user-credentials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-credentials.component.html',
  styleUrl: './user-credentials.component.css'
})
export class UserCredentialsComponent {
  credential:Credentials=new Credentials()
  newCred:Credentials=new Credentials()
  newPassword:string=''

  constructor(private http: HttprequestservicesService,
    private auth:AuthServiceService, private toast:ToastService ){
      var {email} = auth.getDecodedToken() as {email:string}
      this.credential.email = email;
  }

  UpdateCredentialsEmail()
  {
    if(this.newCred.email != this.credential.email){
      this.newCred=this.credential
      this.http.PutEmailData(this.newCred)
        .subscribe
        ({
          next: (data: any) => {
            
            this.newCred = data;
            this.toast.showToast(TOAST_STATE.success, 'Email cambiata con successo')
          },
          error: (error: any) => {
            console.log(error.message);
          }
        })
    }
  }

  UpdateCredentialsPassword()
  {
    this.newCred=this.credential
    this.newCred.password=this.newPassword
    this.http.PutPassawordAlreadyLogged(this.newCred)
      .subscribe
      ({
        next: (data: any) => {
          
          this.newCred = data;
          console.log(this.newCred)
        },
        error: (error: any) => {
          console.log(error.message);
        }
      })
  }
}
