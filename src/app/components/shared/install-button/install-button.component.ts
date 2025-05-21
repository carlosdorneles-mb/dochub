import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-install-button',
  imports: [
    NgIf
  ],
  templateUrl: './install-button.component.html',
  styleUrl: './install-button.component.scss'
})
export class InstallButtonComponent implements OnInit {
  deferredPrompt: any;

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      // Prevent the default mini-infobar from appearing
      event.preventDefault();
      // Save the event for triggering later
      this.deferredPrompt = event;
    });
  }

  installApp(): void {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt(); // Show the install prompt
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        this.deferredPrompt = null; // Clear the saved prompt
      });
    }
  }
}
