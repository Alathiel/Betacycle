import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Credentials } from '../../../shared/models/credential';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';

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
    private auth:AuthServiceService, ){
      this.http.GetHttpCredential().subscribe
      ({
        next: (data: any) => {
          this.credential = data
        },
        error: (err: any) => {
          console.log("Errore: " + err.status);
        }
      })       

  }

  UpdateCredentialsEmail()
  {
    this.newCred=this.credential
    this.http.PutEmailData(this.newCred)
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