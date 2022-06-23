import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[];
  maxMessageId: number;
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    this.http
      .get<Message[]>(
        'https://cms-project-4c979-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  
  storeMessages() {
    let messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(
      'https://cms-project-4c979-default-rtdb.firebaseio.com/messages.json',
      messages,
      { headers: headers }
    )
    .subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    });
  }

  // Get one message
  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
  }

  // Add a message to the message list
  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId + 1;
  }
}
