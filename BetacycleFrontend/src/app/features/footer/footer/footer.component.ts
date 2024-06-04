import { Component } from '@angular/core';
import { Router,RouterOutlet,RouterLink, Route } from '@angular/router';
import { FootServiceService } from '../../../shared/services/foot-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterOutlet,RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(public footServ:FootServiceService){}

}
