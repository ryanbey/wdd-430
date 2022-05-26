import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactsComponent } from "src/app/contacts/contacts.component";
import { DocumentsComponent } from "src/app/documents/documents.component";
import { MessageListComponent } from "src/app/messages/message-list/message-list.component";

const appRoutes: Routes = [
   { path: '', redirectTo: '/documents' },
   { path: 'documents', component: DocumentsComponent },
   { path: 'messages', component: MessageListComponent },
   { path: 'contacts', component: ContactsComponent },
];

@NgModule({
   imports: [RouterModule.forRoot(appRoutes)],
   exports: [RouterModule]
})
export class AppRoutingModule {}