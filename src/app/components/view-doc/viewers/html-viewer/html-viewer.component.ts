import {Component, Input, AfterViewInit} from '@angular/core';
import {Doc} from '../../../../models/doc.model';

@Component({
  standalone: true,
  selector: 'app-html-viewer',
  imports: [],
  template: '<div id="html-container"></div>',
  styles: []
})
export class HtmlViewerComponent implements AfterViewInit {
  @Input() data: Doc = {} as Doc;

  ngAfterViewInit() {
    this.loadDoc();
  }

  loadDoc() {
    fetch(this.data.reference.source)
      .then(response => response.text())
      .then(html => {
        const container = document.getElementById('html-container');
        if (container) {
          container.innerHTML = html;
        }
      })
      .catch(error => console.error('Error fetching the document:', error));
  }
}
