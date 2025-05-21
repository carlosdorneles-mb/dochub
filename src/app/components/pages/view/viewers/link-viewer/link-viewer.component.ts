import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {RouterLink} from '@angular/router';

import {IDoc} from '@models/doc.model';
import {NgIf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-link-viewer',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './link-viewer.component.html',
  styles: []
})
export class LinkViewerComponent implements AfterViewInit, OnDestroy {
  @Input() data: IDoc = {} as IDoc;

  protected countdown = 5;
  private intervalId: any;

  ngAfterViewInit() {
    this.intervalId = setInterval(() => {
      if (this.countdown > 1) {
        this.countdown--;
      } else {
        this.countdown = 0;
        clearInterval(this.intervalId);
        window.open(this.data.reference.source, '_blank');
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.cancelCountdown();
  }

  cancelCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.countdown = 0;
    }
  }
}
