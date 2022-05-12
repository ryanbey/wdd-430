import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../documents.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentData = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'How To Turn Left: A Stock Car Racing Guide', 'Teaching the most important part of driving in circles.', 'http://example.com//', null),
    new Document('2', 'MATH101 Cheat Sheet', 'Addition, subtraction, and... what\'s that one with the... times...', 'http://example.com/', null),
    new Document('3', 'Character Limits and How T', 'Honestly this could have been an email.', 'http://example.com/', null),
    new Document('4', 'How to Deal with Fame', 'A guide by a guy that\'s not actually famous but is marginally academically almost competent.', 'http://example.com/', null),
  ];

  constructor() { }

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentData.emit(document);
  }

}
