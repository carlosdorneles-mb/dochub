import {Component, Input} from '@angular/core';

import {IDoc} from '@models/doc.model';
import {SafePipe} from '@pipes/safe.pipe';
import {LoadingComponent} from '@components/shared/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-iframe-viewer',
  imports: [SafePipe, LoadingComponent],
  template: `
    <app-loading [isLoading]="isLoading"></app-loading>

    <div style="height: 100vh;">
      <iframe (load)="isLoading = false" [src]="data.reference.source | safe" width="100%" height="100%"></iframe>
    </div>
  `,
  styles: []
})
export class IframeViewerComponent {
  protected isLoading = true;

  @Input() data: IDoc = {} as IDoc;
}
