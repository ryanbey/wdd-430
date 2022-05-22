import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  // Get all messages
  getMessages(): Message[] {
    return this.messages.slice();
  }

  // Get one message
  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
  }

  // Add a message to the message list
  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
