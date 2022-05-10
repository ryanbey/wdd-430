import { Component, OnInit } from '@angular/core';
import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})

export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Hello there','I have the high ground!', 'General Kenobi'),
    new Message('2', 'Don\'t make me destroy you', 'You underestimate my power!', 'Anakin Skywalker'),
    new Message('3', 'A message, you have', 'Much fear in you, I sense.', 'Master Yoda')
  ];

  constructor() { }

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
