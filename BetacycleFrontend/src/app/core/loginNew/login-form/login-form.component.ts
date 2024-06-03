import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { Credentials } from '../../../shared/models/credential';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private http:AuthServiceService,private router:Router){}
  @Output() newItemEvent = new EventEmitter<string>();
  stayConnected:boolean = false;
  credentials: Credentials = new Credentials();
  change(value: string) {
    this.credentials = new Credentials();
    this.newItemEvent.emit(value);
  }

  loginJwt(loginForm: any){
    if(loginForm.valid){
      this.http.LoginJWT(this.credentials).subscribe(resp => {
        if(resp.status == HttpStatusCode.Ok){
          this.http.SetLoginStatus(this.stayConnected, resp.body);
          window.location.reload()
          this.router.navigate(['home'])
        }
        else
          console.log("login non riuscito: "+resp.status);
      })
    }
  }
}
