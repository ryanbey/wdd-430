import { Injectable } from '@angular/core';
import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  // Get all messages
  getMessages(): Message[] {
    return this.messages.slice();
  }

  // Get one message
  getMessage(id: string): Message {
    return this.messages.find((document) => document.id === id);
  }
}
