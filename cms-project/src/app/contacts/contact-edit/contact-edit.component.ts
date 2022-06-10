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
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[];
  editMode = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (id === undefined || id === null) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(id);

        if (this.originalContact === undefined || this.originalContact === null) {
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        if (this.contact.group) {
          this.groupContacts = [...this.contact.group];
        }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(this.contactService.maxContactId.toString(),
                                     value.name,
                                     value.email,
                                     value.phone,
                                     value.imageUrl,
                                     null);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
