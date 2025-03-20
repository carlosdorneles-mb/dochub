import {AfterViewInit, Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

import {IDoc} from '@models/doc.model';

@Component({
  standalone: true,
  selector: 'app-link-viewer',
  imports: [
    RouterLink
  ],
  template: `
    <div class="uk-text-center uk-margin-large-top" style="width: 100%;">
      <h3>Uma nova aba foi aberta em seu navegador!</h3>
      <p>
        Caso a aba não tenha sido aberta, clique no link
        <b><a class="uk-link-muted" [href]="data.reference.source" target="_blank">{{ data.reference.source }}</a></b>
      </p>
      <button [routerLink]="['/']" class="uk-button uk-button-secondary" type="button">
        Ir para a página inicial
      </button>
    </div>
  `,
  styles: []
})
export class LinkViewerComponent implements AfterViewInit {
  @Input() data: IDoc = {} as IDoc;

  ngAfterViewInit() {
    window.open(this.data.reference.source, '_blank');
  }
}
