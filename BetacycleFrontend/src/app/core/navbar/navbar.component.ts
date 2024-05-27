import { Component } from '@angular/core';
import { Router,RouterOutlet,RouterLink, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { loginservice } from '../../shared/services/loginservice.service';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { User } from '../../shared/models/user';
import { Credentials } from '../../shared/models/credential';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { ProductComponent } from '../../features/product/product/product.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  token:any
  user:User=new User()
  constructor(private route:Router,private auth:AuthServiceService,private http:HttprequestservicesService)
  {
    
    if(auth.getLoginStatus())
      {
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

    window.location.reload();
    this.route.navigate(['/home']);

  }
}
