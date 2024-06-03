import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router  } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { NavbarServiceService } from '../../shared/services/navbar-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginFormComponent, RegisterFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  status:string = "login"
  constructor(private http:AuthServiceService, public router: Router, navService: NavbarServiceService, token: AuthServiceService){
    navService.show()
    if(token.getLoginStatus() && token.checkUser())
      router.navigate(['home']);
  }
  changeForm(status:any) {
    this.status = status
    console.log(this.status)
  }

}
