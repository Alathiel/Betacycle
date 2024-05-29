import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { Credentials } from '../../../shared/models/credential';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private http:AuthServiceService){}
  @Output() newItemEvent = new EventEmitter<string>();
  stayConnected:boolean = false;
  credentials: Credentials = new Credentials();
  change(value: string) {
    this.credentials = new Credentials();
    this.newItemEvent.emit(value);
  }

  loginJwt(email: NgModel, password:NgModel){
    if(email.valid && password.valid){
      this.http.LoginJWT(this.credentials).subscribe(resp => {
        console.log(resp)
        if(resp.status == HttpStatusCode.Ok){
          console.log('aaa')
          //this.AuthService.setLoggedStatus(this.stayConnected, resp.body);
          //localStorage.setItem('userId', window.btoa(resp.body.userId));
          //this.router.navigate(['home'])
          // const jsonString: string =`{"Authorization": "Basic ${window.btoa(this.credentials.email+':'+this.credentials.password)}"}`;
          // localStorage.setItem('header', JSON.stringify(jsonString));
        }
        else{
          console.log("login non riuscito: "+resp.status);
        }
        
      })
    }
  }
}
