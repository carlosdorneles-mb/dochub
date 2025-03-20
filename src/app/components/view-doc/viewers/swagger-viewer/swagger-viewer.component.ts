import {Component, Input, AfterViewInit} from '@angular/core';
import {Doc} from '../../../../models/doc.model';

/* eslint-disable  @typescript-eslint/no-explicit-any */
declare const SwaggerUIBundle: any;

@Component({
  standalone: true,
  selector: 'app-swagger-viewer',
  imports: [],
  template: '<div id="swagger-container"></div>',
  styles: []
})
export class SwaggerViewerComponent implements AfterViewInit {
  @Input() data: Doc = {} as Doc;

  ngAfterViewInit() {
    this.loadDoc();
  }

  loadDoc() {
    const swaggerLink = document.createElement('link');
    const swaggerScript = document.createElement('script');
    const swaggerStandaloneScript = document.createElement('script');

    swaggerLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.min.css';
    swaggerLink.rel = 'stylesheet';

    swaggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-bundle.min.js';
    swaggerStandaloneScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-standalone-preset.min.js';

    swaggerScript.onload = () => {
      SwaggerUIBundle({
        url: this.data.reference.source,
        dom_id: '#swagger-container',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset,
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl,
        ],
        layout: "BaseLayout",
        deepLinking: true,
        showExtensions: true,
        showCommonExtensions: true
      });
    };

    document.body.appendChild(swaggerLink);
    document.body.appendChild(swaggerScript);
    document.body.appendChild(swaggerStandaloneScript);
  }
}
