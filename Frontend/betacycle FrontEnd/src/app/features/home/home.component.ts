import { Component } from '@angular/core';
import { CaroselloComponent } from '../carosello/carosello.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { PagehomeComponent } from '../pagehome/pagehome.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CaroselloComponent ,FooterComponent ,RouterModule, ContactComponent, PagehomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
