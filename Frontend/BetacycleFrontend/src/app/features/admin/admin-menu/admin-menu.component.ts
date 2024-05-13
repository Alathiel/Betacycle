import { Component } from '@angular/core';
import { HttpServicesService } from '../../../shared/services/http-services.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/Auth.service';
@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class AdminMenuComponent {
  constructor(private authService: AuthService,private http: HttpServicesService, private router: Router){
    if(!authService.getLoggedStatus())
    {
      alert("Error you didn't login.")
      this.redirect('admin-login')
    }
  }

  redirect(route: string){
    this.router.navigate([route])
  }

  logout(){
    this.authService.Logout()
    this.redirect('admin-login')
  }

}
