import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router  } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { NavbarServiceService } from '../../shared/services/navbar-service.service';
import { PasswordExpiredFormComponent } from "./password-expired-form/password-expired-form.component";
import { Credentials } from '../../shared/models/credential';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [CommonModule, RouterModule, LoginFormComponent, RegisterFormComponent, PasswordExpiredFormComponent]
})
export class LoginComponent {
  status:string = "login"
  oldCredentials: Credentials = new Credentials()
  constructor(private http:AuthServiceService, public router: Router, navService: NavbarServiceService, token: AuthServiceService){
    navService.show()
    if(token.getLoginStatus() && token.checkUser())
      router.navigate(['home']);
  }
  changeForm(returned:any) {
    if(typeof(returned) == 'object'){
      this.status = returned.status
      this.oldCredentials = returned.credentials
    }
    else
      this.status = returned
  }

}
