import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carosello',
  templateUrl: './carosello.component.html',
  styleUrls: ['./carosello.component.css'],
  standalone: true,
  imports: [NgbCarouselModule , CommonModule]
})

export class CaroselloComponent {


  constructor() {}
}