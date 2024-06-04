import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { RegisterUser } from '../../../shared/models/RegisterUser';
import { TOAST_STATE, ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  /**
   * @param newCredentials Item for new user
   * @param ConfirmPassword String used for match password
   * @param completed Check for operation succeed
   */
  newCredentials: RegisterUser = new RegisterUser()
  ConfirmPassword: string = ''
  completed = false;
  constructor(private http: AuthServiceService, private router:Router, private toast:ToastService){}
  @Output() newItemEvent = new EventEmitter<string>();

  /**Login change */
  change(value: string) {
    this.newItemEvent.emit(value);
  }
  /** Register New user */ 
  register(registerForm:any, birthdate:NgModel){
    if(registerForm.valid && this.checkUnderage(birthdate) == false)
    {
      this.http.registerCredentials(this.newCredentials).subscribe({
        next: (response:any) =>{
            this.completed = true
        },
        error: (error:any) => {
          this.toast.showToast(TOAST_STATE.error,error)
        }
      }) 
      
    }
  }

  /**Check if the age insert is under 18 */
  checkUnderage(date: NgModel): boolean
  {
    if(new Date().getTime() - new Date(date.value).getTime() > 568025136000){
      return false
    }
    return true
  }

  /**Redirect function for all method */
  redirect(route: string){
    this.router.navigate([route])
  }

}
