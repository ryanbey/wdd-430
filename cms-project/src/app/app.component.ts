import { Component } from '@angular/core';

import { HeaderComponent } from './header.component';

@Component({
   selector: 'cms-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent {
   title = 'cms-project';
   selectedFeature = 'documents';  // Loads by default
   
   switchView(selectedFeature: string) {
      this.selectedFeature = selectedFeature;
   }
}
