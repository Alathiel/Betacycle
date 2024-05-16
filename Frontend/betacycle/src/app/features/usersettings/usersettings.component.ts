import { Component } from '@angular/core';
import { HttprequestService } from '../../shared/services/httprequest.service';
import { Address } from '../../shared/models/address';
import { jwtDecode } from 'jwt-decode';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usersettings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.css'
})
export class UsersettingsComponent {

  address: Address = new Address();
  getaddress: Address[] = [];
  decodejwt: any;

  constructor(private http: HttprequestService)
  {
    this.decodejwt = localStorage.getItem('jwtToken')!;
    this.decodejwt = jwtDecode(this.decodejwt)

    this.http.GetUserInfo(this.decodejwt.unique_name).subscribe
        ({
          next: (data: any) => {
            this.getaddress = data.addresses.$values
            console.log(this.getaddress)
          },
          error: (err: any) => {
            console.log("Errore: " + err.status);
          }
        })

        /*this.http.GetAddresses(this.decodejwt.unique_name).subscribe
        ({
          next: (data: any) => {
            console.log(data)
          },
          error: (err: any) => {
            console.log("Errore: " + err.status);
          }
        })*/
  }

  AddAddress(address: HTMLInputElement, city: HTMLInputElement, province: HTMLInputElement, nation: HTMLSelectElement, cap: HTMLInputElement)
  {
    if(address.value != '' && city.value != '' && province.value != '' && nation.value != '' && cap.value != '')
      {
        this.address.address1 = address.value;
        this.address.city = city.value;
        this.address.province = province.value;
        this.address.nation = nation.value;
        this.address.cap = cap.value;
        this.address.userId = this.decodejwt.unique_name;

        this.http.AddAddress(this.address)
        .subscribe
        ({
          next: (data: any) => {
            this.address = data;
            window.location.reload();
          },
          error: (err: any) => {
            console.log(err);
          }
        })

      }
    else
    {
      alert("You need to fill all the data!");
    }
  }

  DeleteAddress(idaddress: number, iduser: number)
  {
    this.http.DeleteAddress(iduser, idaddress)
        .subscribe
        ({
          next: (data: any) => {
            this.address = data;
          },
          error: (err: any) => {
            console.log(err);
          }
        })

        window.location.reload();
  }

  PatchAddress(patchaddress: Address)
  {
    console.log(patchaddress);
  }

}
