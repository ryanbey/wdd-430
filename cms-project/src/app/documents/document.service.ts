import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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
    if (!document) {
      return
    };

    const index = this.documents.indexOf(document);
    if (index < 0) {
      return;
    };

    this.documents.splice(index, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  // Find maximum ID to generate unique ID for new documents
  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  // Add a new document to the document list
  addDocument(newDoc: Document) {
    if (!newDoc) {
      return;
    }

    this.maxDocumentId++;
    let newId = +newDoc.id;
    newId = this.maxDocumentId;
    this.documents.push(newDoc);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }


  // Edit or update a document and add it to the document list
  updateDocument(ogDoc: Document, newDoc: Document): Document {
    if (!ogDoc || !newDoc) {
      return;
    }

    const index = this.documents.indexOf(ogDoc);
    if (index < 0) {
      return;
    }

    newDoc.id = ogDoc.id;
    this.documents[index] = newDoc;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

}
