import { Component } from '@angular/core';
import { Address } from '../../shared/models/address';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { jwtDecode } from 'jwt-decode';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usersettings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.css'
})
export class UsersettingsComponent {
  getaddress: Address[] = [];
  constructor(private http: HttprequestservicesService) 
  {
    
  }


}
