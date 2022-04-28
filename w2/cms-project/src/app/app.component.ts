import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  // QUIZ Q: template or tempalteURL are required. This line links to HTML file for this component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cms-project';
}
