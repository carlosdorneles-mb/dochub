import {Component, Input, AfterViewInit} from '@angular/core';
import {Doc} from '../../../../models/doc.model';

/* eslint-disable  @typescript-eslint/no-explicit-any */
declare const Redoc: any;

@Component({
  standalone: true,
  selector: 'app-redoc-viewer',
  template: '<div id="redoc-container"></div>',
  styles: []
})
export class RedocViewerComponent implements AfterViewInit {
  @Input() data: Doc = {} as Doc;

  ngAfterViewInit() {
    this.loadDoc();
  }

  loadDoc() {
    const redocScript = document.createElement('script');

    redocScript.src = 'https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js';
    redocScript.onload = () => {
      Redoc.init(
        this.data.reference.source,
        {
          // scrollYOffset: 60,
          hideDownloadButton: true,
          theme: {
            colors: {
              primary: {
                main: "#ff5722",
              },
            },
          },
        },
        document.getElementById('redoc-container'),
      );
    };

    document.body.appendChild(redocScript);
  }
}
