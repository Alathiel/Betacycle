import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupportChatSignalRService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7044/SupportChatHub') // SignalR hub URL
      
      .build();
  }

  startConnection(): Observable<string> {
    return new Observable<string>((observer) => {
      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection established with SignalR hub');
          observer.next(this.hubConnection.connectionId+'');
          observer.complete();
        })
        .catch((error) => {
          console.error('Error connecting to SignalR hub:', error);
          observer.error(error);
        });
    });
  }

  receiveMessage(): Observable<any> {
    return new Observable<any>((observer) => {
      this.hubConnection.on('ReceiveMessage', (message: string, user:string) => {
        observer.next({message: message, user: user});
      });
    });
  }

  sendMessage(message: string): void {
    this.hubConnection.invoke('SendMessage', message, 'User');
  }

  onConnection(connectionId:string): void{
    this.hubConnection.invoke('OnConnection',connectionId);
  }
}