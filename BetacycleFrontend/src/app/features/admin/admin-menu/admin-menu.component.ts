import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { NavbarServiceService } from '../../../shared/services/navbar-service.service';
import { FootServiceService } from '../../../shared/services/foot-service.service';
@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class AdminMenuComponent {
  constructor(private token: AuthServiceService, private router: Router, navService: NavbarServiceService, footServ:FootServiceService){
    footServ.hide();
    navService.hide();
    if(!token.getLoginStatus() || !token.checkAdmin())
      this.router.navigate(['admin-login']);
  }

  redirect(route: string){
    this.router.navigate([route])
  }

  logout(){
    this.token.Logout()
    this.redirect('admin-login')
  }

}
