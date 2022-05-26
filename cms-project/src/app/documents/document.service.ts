import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  // Get all documents
  getDocuments(): Document[] {
    return this.documents
      .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
      .slice();
  }

  // Get one document
  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

  // Delete one document
  deleteDocument(document: Document) {
    if (!document) {return};
    const pos = this.documents.indexOf(document);
    if (pos < 0) {return};
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
