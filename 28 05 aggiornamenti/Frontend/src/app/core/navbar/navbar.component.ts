import { Component } from '@angular/core';
import { Router,RouterOutlet,RouterLink, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { loginservice } from '../../shared/services/loginservice.service';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { User } from '../../shared/models/user';
import { Credentials } from '../../shared/models/credential';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { ProductComponent } from '../../features/product/product/product.component';
import { ProductserviceService } from '../../shared/services/productservice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  token:any
  user:User=new User()
  constructor(private route:Router,private auth:AuthServiceService,private http:HttprequestservicesService,public service:ProductserviceService)
  {
    
    if(auth.getLoginStatus())
      {
        this.isLogged=true
        this.DisplayUserInfo() 
      }

  }
  isLogged: boolean = false;
  jwtToken: any;
  decodedTokenPayload: any;

  DisplayUserInfo()
  {
    var decodedToken = JSON.parse(window.atob(this.auth.getToken()!.split('.')[1]));
    if(this.auth.getLoginStatus() && decodedToken.role !== 'Admin')
    {
      this.http.GetUserInfo().subscribe(
      {
        next: (data: any) => {
          this.user = data
        },
        error: (err: any) => {
          console.log("Errore: " + err.status);
        }
      })
    }
  }

  GoToUserSettings()
  {
    this.route.navigate(['usersetting'])
  }

  LogOut()
  {
    this.auth.Logout();
  }

  GoToSearch()
  {
    this.route.navigate(['product'])
  }
}
