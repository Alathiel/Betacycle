import { Component } from '@angular/core';
import { HttpServicesService } from '../../shared/services/http-services.service';
import { AuthService } from '../../shared/services/Auth.service';
import { Address } from '../../shared/models/address';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  addresses: Address[] = []
  constructor(private http: HttpServicesService, auth: AuthService){
    http.getAddresses(sessionStorage.getItem('token')+'', atob(sessionStorage.getItem('userId')+'')).subscribe({
      next: (jsData: any) => {
        this.addresses = jsData.body.$values;
        console.log(this.addresses)
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
