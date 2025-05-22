import {Injectable} from '@angular/core';

declare const UIkit: any;

/**
 * Service for displaying toast notifications using UIkit.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  /**
   * Displays a toast notification.
   *
   * @param message - The message to display in the notification.
   */
  message(message: string) {
    UIkit.notification({message: message, pos: 'top-right', status: 'primary'})
  }
}
