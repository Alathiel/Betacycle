import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/models/user';
import { FormControl, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { Credentials } from '../../../shared/models/credential';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  newUser: User = new User();
  newCredentials: Credentials = new Credentials();
  ConfirmPassword: string = ''
  birthdateError = false;
  // userForm:any = null
  constructor(private http: AuthServiceService, private router:Router){}
  @Output() newItemEvent = new EventEmitter<string>();

  change(value: string) {
    this.newItemEvent.emit(value);
  }

  register(firstName: NgModel, lastName: NgModel, birthdate: NgModel, email: NgModel, password: NgModel, confirmPassword: NgModel){
    if(firstName.valid && lastName.valid && birthdate.valid && email.valid && password.valid && confirmPassword.valid && this.checkUnderage(birthdate) == false){
    this.http.registerUserData(this.newUser).subscribe({
      next: (resp: any) => {
        this.newCredentials.userId = resp.userId;
        this.http.registerCredentials(this.newCredentials).subscribe({
          next: (jsData: any) =>{
            console.log(jsData)
          },
          // error: (error) => {
          //   console.log(error)
          //   this.httpCalls.deleteUserData(this.newCredentials.userId).subscribe({
          //     next: (jsData: any) =>{
          //       console.log(jsData)
          //       //set login status and redirect
          //       this.redirect("Home");
          //     },
          //     error: (error:any) => {
          //       console.log(error)
          //     }
          //   })
          // },
        }) 
      },
      error: (error) => {
        console.log(error);
      }
    })
    }
  }

  checkUnderage(date: NgModel): boolean
  {
    if(new Date().getTime() - new Date(date.value).getTime() > 568025136000){
      return false
    }
    return true
  }

  redirect(route: string){
    this.router.navigate([route])
  }
}
