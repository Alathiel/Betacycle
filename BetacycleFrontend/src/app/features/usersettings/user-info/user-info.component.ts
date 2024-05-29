import { Component, OnChanges } from '@angular/core';
import { User } from '../../../shared/models/user';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttprequestservicesService } from '../../../shared/services/httprequestservices.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  token:any   //TOKEN SESSION

  constructor(private http: HttprequestservicesService, private auth:AuthServiceService){
    this.token=sessionStorage.getItem('token')
    this.token=this.auth.getDecodedToken()
    this.http.GetUserInfo().subscribe
        ({
          next: (data: any) => {

            this.user = data
          },
          error: (err: any) => {
            console.log("Errore: " + err.status);
          }
        })
  }
  user:User=new User()  
  newUser:User=new User()  

  UpdateUser()
  {
    this.newUser=this.user
    this.http.PutUserData(this.token.nameid, this.newUser)
      .subscribe
      ({
        next: (data: any) => {
          this.newUser = data;
        },
        error: (error: any) => {
          console.log(error.message);
        }
      })
  }

  ngOnChanges(changes: any): void {
    if (changes != null) {
         console.log(changes);
     }
    }
}
