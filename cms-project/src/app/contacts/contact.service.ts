import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {}

  // Get all contacts
  getContacts() {
    this.http
      .get<{ message: String; contacts: Contact[] }>(
        'http://localhost:3000/contacts'
      )
      .subscribe(
        (responseData) => {
          this.contacts = responseData.contacts;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  // Get one contact
  getContact(id: string) {
    return this.http.get<{ message: string; contact: Contact }>(
      'http://localhost:3000/contacts/' + id
    );
  }

  // Delete one contact
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // Delete from database
    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
  }

  // Add a new contact to the contact list
  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new Contact is empty
    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Add to database
    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        contact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // Add new contact to contacts
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });
  }

  // Edit or update a contact and add it to the contact list
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // Set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Update database
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
  }

  sortAndSend() {
    this.contacts.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
