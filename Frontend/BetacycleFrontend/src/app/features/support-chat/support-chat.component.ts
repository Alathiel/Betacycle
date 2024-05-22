import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupportChatSignalRService } from '../../shared/services/support-chat-signal-r.service';
import { NoAuthCalls } from '../../shared/services/noAuth-calls.service';

@Component({
  selector: 'app-support-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './support-chat.component.html',
  styleUrl: './support-chat.component.css'
})
export class SupportChatComponent {
  constructor(private signalRService: SupportChatSignalRService, private http:NoAuthCalls) {}
  receivedMessage:any[] = [];
  writeMessage: string = ''
  connections:any[] = [] 
  ngOnInit(): void {
    // this.signalRService.startConnection().subscribe((connectionId) => {
    //   this.signalRService.onConnection(connectionId);
    //   this.signalRService.receiveMessage().subscribe((message) => {
    //     this.receivedMessage.push(message);
    //   });
    // });
    this.http.getConnectionsOpen().subscribe((resp) => this.connections = resp.$values);
  }

  sendMessage(message: string): void {
    this.signalRService.sendMessage(message);
  }

  showConnection(){
    console.log(this.connections)
  }
}
