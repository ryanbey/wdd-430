import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit {
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fill in form fields based on id in URL
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (params['id'] != null) {
        this.editMode = true;
      }

      if (this.id) {
        this.contactService
          .getContact(this.id)
          .subscribe((result: { message: String; contact: Contact }) => {
            this.contact = result.contact;
          });
      }
    });
  }

  onSubmit(form: NgForm) {
    const newContact = new Contact(
      '',
      '',
      form.value.name,
      form.value.email,
      form.value.phone,
      form.value.imageUrl,
      null
    );

    if (this.editMode) {
      this.contactService.updateContact(this.contact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
