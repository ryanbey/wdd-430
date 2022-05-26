import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
   selector: 'cms-contact-detail',
   templateUrl: './contact-detail.component.html',
   styleUrls: ['./contact-detail.component.scss']
})

export class ContactDetailComponent implements OnInit {
   contact: Contact;
   id: string;

   constructor(private contactService: ContactService,
               private router: Router,
               private route: ActivatedRoute) {}

   ngOnInit(): void {
      // Subscribe to active route, get id from active route, get contact with that id
      this.route.params.subscribe((params: Params) => {
         this.id = params['id'];
         this.contact = this.contactService.getContact(this.id);
      });
   }

}
