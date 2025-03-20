import {AfterViewInit, Component, Input} from '@angular/core';
import {Doc} from '../../../../models/doc.model';

@Component({
  standalone: true,
  selector: 'app-iframe-viewer',
  imports: [],
  template: '<div id="iframe-container"></div>',
  styles: []
})
export class IframeViewerComponent implements AfterViewInit {
  @Input() data: Doc = {} as Doc;

  ngAfterViewInit() {
    this.loadDoc();
  }

  loadDoc() {
    const iframe = document.createElement('iframe');

    iframe.src = this.data.reference.source;
    iframe.title = this.data.reference.title;
    iframe.classList.add('iframe');

    document.getElementById('iframe-container')!.appendChild(iframe);
  }
}
