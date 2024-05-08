import { Component } from '@angular/core';
import { HttpServicesService } from '../../../shared/services/http-services.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class AdminMenuComponent {
  constructor(private http: HttpServicesService, private router: Router){}

  redirect(route: string){
    this.router.navigate([route])
  }

}
