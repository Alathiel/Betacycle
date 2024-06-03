import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/models/user';
import { FormControl, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { Credentials } from '../../../shared/models/credential';
import { RegisterUser } from '../../../shared/models/RegisterUser';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  newCredentials: RegisterUser = new RegisterUser()
  ConfirmPassword: string = ''
  birthdateError = false;
  completed = false;
  constructor(private http: AuthServiceService, private router:Router){}
  @Output() newItemEvent = new EventEmitter<string>();

  change(value: string) {
    this.newItemEvent.emit(value);
  }

  register(registerForm:any, birthdate:NgModel){
    if(registerForm.valid && this.checkUnderage(birthdate) == false)
    {
      this.http.registerCredentials(this.newCredentials).subscribe({
        next: (response:any) =>{
          console.log(response)
          if(response.status == HttpStatusCode.Created)
            this.completed = true
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
