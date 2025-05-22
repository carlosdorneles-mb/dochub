import {Component, CUSTOM_ELEMENTS_SCHEMA, HostListener} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SwUpdate} from '@angular/service-worker';

import {HeaderComponent} from '@components/shared/header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showTopButton = false;

  constructor(private swUpdate: SwUpdate) {
    this.checkForUpdates();
  }

  checkForUpdates() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          this.sendNotification();
        }
      });
    }
  }

  sendNotification() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const notification = new Notification('Nova versão disponível!', {
          body: 'Clique para atualizar.',
          icon: 'icons/icon-72x72.png',
          requireInteraction: true,
        });
        notification.onclick = () => {
          this.updateApp();
        };
      }
    });
  }

  updateApp() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showTopButton = window.scrollY > 350;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
