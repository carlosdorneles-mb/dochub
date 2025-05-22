import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {TransmitterService} from '@services/transmitter.service';
import {PushService} from '@services/push.service';
import {IDoc} from '@models/doc.model';
import {InstallButtonComponent} from '@components/shared/install-button/install-button.component';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    InstallButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();

  protected data: IDoc | null = null;
  protected searchQuery = '';

  protected showNotificationIcon = false;
  protected animateNotificationIcon = false;

  constructor(
    private router: Router,
    private transmitterService: TransmitterService,
    private push: PushService,
  ) {
  }

  ngOnInit(): void {
    this.transmitterService.getData().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.data = data;
    });

    this.initNotificationIcon();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  navigateToSearch(): void {
    this.router.navigate(['/search'], {queryParams: {q: this.searchQuery}});
  }

  initNotificationIcon() {
    this.showNotificationIcon = !this.push.isNotificationEnabled();

    if (this.showNotificationIcon) {
      setInterval(() => {
        this.animateNotificationIcon = true;
        setTimeout(() => this.animateNotificationIcon = false, 1000); // duração da animação: 1s
      }, 5000); // a cada 5s
    }
  }

  async requestEnableNotification() {
    await this.push.requestNotificationPermission()
      .then(() => {
        this.showNotificationIcon = false;
      })
      .catch(() => {
        this.showNotificationIcon = true;
      });
  }
}
