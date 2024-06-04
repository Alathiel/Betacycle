import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FootServiceService {
  constructor() { }
  active:boolean = true;
  show = () => this.active=true;
  hide = () => this.active = false;
  toggle = () => this.active = !this.active
}
