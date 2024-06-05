import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { loginservice } from '../../shared/services/loginservice.service';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { User } from '../../shared/models/user';
import { Credentials } from '../../shared/models/credential';
import { HttprequestservicesService } from '../../shared/services/httprequestservices.service';
import { ProductserviceService } from '../../shared/services/productservice.service';
import { FormsModule } from '@angular/forms';
import { NavbarServiceService } from '../../shared/services/navbar-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

/**Navigation bar component of the web site
 * @param token Login token if user is logged
 * @param user User data to show on navbar
 */
export class NavbarComponent {

  user: User = new User();
  constructor(
    private route: Router,
    private auth: AuthServiceService,
    private http: HttprequestservicesService,
    public service: ProductserviceService,
    public navService: NavbarServiceService
  ) {
    if (auth.getLoginStatus() && auth.checkUser()) {
      this.isLogged = true;
      this.DisplayUserInfo();
    }
  }

  isLogged: boolean = false;
  jwtToken: any;
  decodedTokenPayload: any;
  /**Showing user data */
  DisplayUserInfo() {
    this.http.GetUserInfo().subscribe({
      next: (data: any) => {
        this.user = data;
      },
      error: (err: any) => {
        console.log('Errore: ' + err.status);
      },
    });
  }
  /**REdirect on user setting page */
  GoToUserSettings() {
    this.route.navigate(['usersetting']);
  }
  /**Logout function, removing token from session storage and redirect home */
  LogOut() {
    this.auth.Logout();
    window.location.reload();
    this.route.navigate(['home']);
  }

  /**Go on the main page of the product */
  GoToSearch() {
    this.route.navigate(['product']);
  }
}
