import { Component} from '@angular/core';
import {FormsModule, NgForm, NgModel, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { UserInfoComponent } from './user-info/user-info.component';
import { UserCredentialsComponent } from "./user-credentials/user-credentials.component";
import { UseraddressComponent } from './useraddress/useraddress.component';
import { UserpaymentsComponent } from './userpayments/userpayments.component';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../shared/services/auth-service.service';

@Component({
  selector: 'app-usersettings',
  standalone: true,
  imports: [CommonModule, FormsModule, NgTemplateOutlet,NgbNavModule,ReactiveFormsModule,UseraddressComponent,UserpaymentsComponent,UserInfoComponent, UserCredentialsComponent],
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.css'
})
export class UsersettingsComponent {
  active = 'top';

  /**Can't open this page if you aren't logged */
  constructor(router: Router, token: AuthServiceService){
    if(!token.getLoginStatus() || !token.checkUser())
      router.navigate(['login']);
  }
}
