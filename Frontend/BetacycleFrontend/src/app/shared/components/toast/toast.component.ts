import { Component, Input, OnInit } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  providers: [provideAnimations(),],
  animations:[
    trigger('toastTrigger', [
    state('open', style({ transform: 'translateY(0%)' })), // This is how the 'open' state is styled      
    state('close', style({ transform: 'translateY(-200%)'})), // This is how the 'close' state is styled      
      transition('open <=> close', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent{
  constructor(public toast: ToastService ){}
  
}
