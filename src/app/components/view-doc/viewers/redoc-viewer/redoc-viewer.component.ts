import {Component, Input, AfterViewInit} from '@angular/core';

import {IDoc} from '@models/doc.model';
import {LoadingComponent} from '@components/loading/loading.component';

declare const Redoc: any;

@Component({
  standalone: true,
  selector: 'app-redoc-viewer',
  template: `
    <app-loading [isLoading]="isLoading"></app-loading>
    <div id="redoc-container"></div>
  `,
  imports: [
    LoadingComponent
  ],
  styles: []
})
export class RedocViewerComponent implements AfterViewInit {
  protected isLoading = true;

  @Input() data: IDoc = {} as IDoc;

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
        () => {
          this.isLoading = false;
        }
      );
    };

    document.body.appendChild(redocScript);
  }
}
