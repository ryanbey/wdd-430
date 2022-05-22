import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.scss']
})

export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  currentSender = '1';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;
    const message = new Message('1', subjectValue, msgTextValue, this.currentSender);

    // Don't add message unless both fields are filled in
    if (subjectValue && msgTextValue) {
      this.messageService.addMessage(message);      
      this.onClear();
    }
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
