import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = [];
    this.maxDocumentId = this.getMaxId();
  }

  // Get all documents from Firebase
  getDocuments() {
    this.http
      .get<Document[]>(
        'https://cms-project-4c979-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          );
          this.documentListChangedEvent.next(this.documents.slice());
          console.log('Got documents from Firebase!');
        },
        // error method
        (error: any) => {
          console.log(error);
        }
      );
  }

  storeDocuments() {
    let documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(
      'https://cms-project-4c979-default-rtdb.firebaseio.com/documents.json',
      documents,
      { headers: headers }
    )
    .subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }

  // Get one document
  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

  // Delete one document
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const index = this.documents.indexOf(document);
    if (index < 0) {
      return;
    }

    this.documents.splice(index, 1);
    this.storeDocuments();
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

    return maxId + 1;
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
    this.storeDocuments();
  }

  // Edit or update a document and add it to the document list
  updateDocument(ogDocument: Document, newDocument: Document): Document {
    if (!ogDocument || !newDocument) {
      return;
    }

    const index = this.documents.indexOf(ogDocument);
    if (index < 0) {
      return;
    }

    newDocument.id = ogDocument.id;
    this.documents[index] = newDocument;
    this.storeDocuments();
  }
}
