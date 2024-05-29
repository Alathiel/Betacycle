import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer/footer.component';
@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [RouterModule,FooterComponent],
  templateUrl: './chi-siamo.component.html',
  styleUrl: './chi-siamo.component.css'
})
export class ChiSiamoComponent {

}
