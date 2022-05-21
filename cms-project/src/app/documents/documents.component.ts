import { Component, OnInit, Output } from '@angular/core';
import { DocumentService } from './document.service';
import { Document } from './documents.model';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }
}
