import { Component, OnInit } from '@angular/core';
import { Document } from '../documents.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode = false;

  constructor() {}

  ngOnInit(): void {
  }

  onSubmit(form) {

  }

  onCancel() {
    
  }

}
