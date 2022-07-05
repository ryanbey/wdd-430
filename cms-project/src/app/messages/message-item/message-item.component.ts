import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService
      .getContact(this.message.sender.id)
      .subscribe((contactData) => {
        this.messageSender = contactData.contact.name;
      });
  }
}
