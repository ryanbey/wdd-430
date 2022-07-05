import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './messages.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {}

  // Get all messages
  getMessages() {
    this.http
      .get<{ message: String; messages: Message[] }>(
        'http://localhost:3000/messages'
      )
      .subscribe(
        (responseData) => {
          this.messages = responseData.messages;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  // Get one message
  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
  }

  // Add a message to the message list
  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // make sure id of the new Message is empty
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ postMessage: string; message: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new message to messages
        this.messages.push(responseData.message);
      });
  }
}
