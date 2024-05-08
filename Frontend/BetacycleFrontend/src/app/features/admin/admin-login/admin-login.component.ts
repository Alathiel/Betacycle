import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/Auth.service';
import { Credentials } from '../../../shared/models/credentials';
import { HttpStatusCode } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  constructor(private AuthService: AuthService, private router: Router){}
  credentials: Credentials = new Credentials()
  stayConnected: boolean = false

  loginJwt(){
    this.AuthService.AdminLoginJWT(this.credentials).subscribe(resp => {
      console.log(resp)
      if(resp.status == HttpStatusCode.Ok){
        this.AuthService.setLoggedStatus(this.stayConnected, resp.body);
        localStorage.setItem('userId', window.btoa(resp.body.userId));
        this.router.navigate(['admin-menu'])
        // const jsonString: string =`{"Authorization": "Basic ${window.btoa(this.credentials.email+':'+this.credentials.password)}"}`;
        // localStorage.setItem('header', JSON.stringify(jsonString));
      }
      else{
        console.log("login non riuscito: "+resp.status);
      }
      
    })
  }
}
