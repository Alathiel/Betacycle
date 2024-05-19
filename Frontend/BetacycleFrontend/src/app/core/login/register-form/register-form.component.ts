import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/models/user';
import { FormControl, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/Auth.service';
import { Credentials } from '../../../shared/models/credentials';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  newUser: User = new User();
  newCredentials: Credentials = new Credentials();
  ConfirmPassword: string = ''
  birthdateError = false;
  // userForm:any = null
  constructor(private http: AuthService){
    // this.userForm = new FormGroup({
    //   name: new FormControl(this.newUser.firstName, [
    //     Validators.required,
    //     Validators.minLength(4),
    // });
  }
  @Output() newItemEvent = new EventEmitter<string>();

  change(value: string) {
    this.newItemEvent.emit(value);
  }

  register(firstName: NgModel, lastName: NgModel, birthdate: NgModel, email: NgModel, password: NgModel, confirmPassword: NgModel){
    if(firstName.valid && lastName.valid && birthdate.valid && email.valid && password.valid && confirmPassword.valid && this.checkUnderage(birthdate) == false){
      console.log('ez')
    }
    // this.http.registerUserData(this.newUser).subscribe({
    //   next: (resp: any) => {
    //     this.newCredentials.userId = resp.userId;
    //     this.http.registerCredentials(this.newCredentials).subscribe({
    //       next: (jsData: any) =>{
    //         console.log(jsData)
    //       },
    //       error: (error) => {
    //         console.log(error)
    //         this.http.deleteUserData(this.newCredentials.userId).subscribe({
    //           next: (jsData: any) =>{
    //             console.log(jsData)
    //           },
    //           error: (error) => {}
    //         })
    //       },
    //     }) 
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })
  }

  checkUnderage(date: NgModel): boolean
  {
    if(new Date().getTime() - new Date(date.value).getTime() > 568025136000){
      return false
    }
    return true
  }
}
