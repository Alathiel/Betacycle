import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NavbarServiceService {
  active:boolean = true;
  constructor() { }

  show = () => this.active=true;
  hide = () => this.active = false;
  toggle = () => this.active = !this.active
}
