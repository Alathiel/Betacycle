import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NewUserPwdComponent } from '../newuserpwd/newuserpwd.component';
import { loginservice } from '../../shared/services/loginservice.service';
import { ProductComponent } from '../../features/product/product.component';
import { HomeComponent } from '../home/home.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/models/user';
import { jwtDecode } from 'jwt-decode';
import { HttprequestService } from '../../shared/services/httprequest.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, LoginComponent, NewUserPwdComponent, ProductComponent, HomeComponent, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLogged: boolean = false;
  jwtToken: any;
  decodedTokenPayload: any;
  user: User = new User();

  constructor(private loginservice: loginservice, private route: Router, private http: HttprequestService)
  {
    this.isLogged = this.loginservice.CheckingLogin();
    if(this.isLogged)
      {
        this.DisplayUserInfo();
      }
  }

  onActionClick(event: Event): void
  {
    event.preventDefault();
  }

  DisplayUserInfo()
  {
    this.jwtToken = localStorage.getItem('jwtToken');
    console.log(this.jwtToken)
    this.decodedTokenPayload = jwtDecode(this.jwtToken);
    this.user.userId = this.decodedTokenPayload.unique_name;

    if (this.loginservice.CheckingLogin()) {
      this.http.GetUserInfo(this.user.userId).subscribe
        ({
          next: (data: any) => {
            this.user = data
            //console.log(this.user);
          },
          error: (err: any) => {
            console.log("Errore: " + err.status);
          }
        })
    }
  }

  LogOut()
  {
    //localStorage.removeItem('jwtToken');
    this.loginservice.setLoginJWT(false);

    //window.location.reload();
    this.route.navigate(['/home']);
    window.location.reload();
  }

  Research(name: HTMLInputElement)
  {
    alert(name.value);
  }
}
