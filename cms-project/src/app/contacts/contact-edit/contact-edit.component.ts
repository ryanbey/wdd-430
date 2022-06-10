import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  contact: Contact;
  groupContacts: Contact[];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form) {
    
  }

  onCancel() {

  }

}
