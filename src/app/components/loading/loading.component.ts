import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-loading',
  imports: [
    NgIf
  ],
  template: `
    <div *ngIf="isLoading">
      <div *ngIf="loadingCentralized" class="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
        <span uk-spinner="ratio: 3"></span>
      </div>
      <div *ngIf="!loadingCentralized" class="uk-text-center uk-margin-large">
        <span uk-spinner="ratio: 3"></span>
      </div>
    </div>
  `,
  styles: []
})
export class LoadingComponent {
  @Input() isLoading = true;
  @Input() loadingCentralized = true;
}
