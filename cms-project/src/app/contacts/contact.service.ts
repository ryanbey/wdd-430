import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = [];
    this.maxContactId = this.getMaxId();
  }

  // Get all contacts
  getContacts() {
    this.http
      .get<Contact[]>(
        'https://cms-project-4c979-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          );
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  storeContacts() {
    let contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(
      'https://cms-project-4c979-default-rtdb.firebaseio.com/contacts.json',
      contacts,
      { headers: headers }
    )
    .subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }

  // Get one contact
  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  // Delete one contact
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  // Find maximum ID to generate unique ID for new contacts
  getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts) {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId + 1;
  }

  // Add a new contact to the contact list
  addContact(newContact: Contact): Contact {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    let newId = +newContact.id;
    newId = this.maxContactId;
    this.contacts.push(newContact);
    this.storeContacts();
  }

  // Edit or update a contact and add it to the contact list
  updateContact(ogContact: Contact, newContact: Contact): Contact {
    if (!ogContact || !newContact) {
      return;
    }

    const index = this.contacts.indexOf(ogContact);
    if (index < 0) {
      return;
    }

    newContact.id = ogContact.id;
    this.contacts[index] = newContact;
    this.storeContacts();
  }
}
