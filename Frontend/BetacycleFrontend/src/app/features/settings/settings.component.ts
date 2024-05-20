import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  constructor(private router: Router){}

  backHome(){
    this.router.navigate(['home']);
  }

  redirectAddress(){
    this.router.navigate(['address']);
  }
}
