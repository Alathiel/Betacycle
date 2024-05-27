import { Component } from '@angular/core';
import { SupportChatSignalRService } from '../../../shared/services/support-chat-signal-r.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './support-chat.component.html',
  styleUrl: './support-chat.component.css'
})
export class SupportChatUserComponent {
  constructor(private signalRService: SupportChatSignalRService) {}
  receivedMessage:any[] = [];
  writeMessage: string = ''
  ngOnInit(): void {
    this.signalRService.startConnection().subscribe((connectionId) => {
      this.signalRService.onConnection(connectionId);
      this.signalRService.receiveMessage().subscribe((message) => {
        this.receivedMessage.push(message);
      });
    });
  }

  sendMessage(message: string): void {
    this.signalRService.sendMessage(message);
  }
}
