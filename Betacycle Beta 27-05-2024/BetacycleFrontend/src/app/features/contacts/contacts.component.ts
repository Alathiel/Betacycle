import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer/footer.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [RouterModule,FooterComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {

}
