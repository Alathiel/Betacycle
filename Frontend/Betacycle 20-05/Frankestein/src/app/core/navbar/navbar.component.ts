import { Component } from '@angular/core';
import { Router,RouterOutlet,RouterLink, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { loginservice } from '../../shared/services/loginservice.service';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { User } from '../../shared/models/user';
import { Credentials } from '../../shared/models/credential';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';

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
  constructor(private loginservice:loginservice, private route:Router,private auth:AuthServiceService,private http:HttprequestservicesService)
  {
    this.isLogged = this.loginservice.CheckingLogin();
    if(this.isLogged)
      {
        this.DisplayUserInfo()        
      }

  }
  isLogged: boolean = false;
  jwtToken: any;
  decodedTokenPayload: any;

  DisplayUserInfo()
  {
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

  GoToUserSettings()
  {
    this.route.navigate(['usersetting'])
  }

  LogOut()
  {
    //localStorage.removeItem('jwtToken');
    this.loginservice.setLoginJWT(false);

    //window.location.reload();
    this.route.navigate(['/home']);
    window.location.reload();
  }
}
