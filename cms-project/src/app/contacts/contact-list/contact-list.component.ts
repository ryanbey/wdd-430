import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit(): void {
    this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }
}
