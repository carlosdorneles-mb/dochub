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
   * @param position - The position of the notification on the screen. Default is 'top-right'. See the options at: https://getuikit.com/docs/notification#position
   * @param style - The style of the notification. Default is 'primary'. See the options at: https://getuikit.com/docs/notification#style
   * @param timeout - The duration in milliseconds before the notification automatically closes. If set to 0, notification will not hide automatically. Default is 5000ms.
   */
  message(message: string, position = 'top-right', style = 'primary', timeout = 5000) {
    UIkit.notification({
      message: message,
      pos: position,
      status: style,
      timeout,
    })
  }

  /**
   * Close all toast notifications.
   */
  closeAll() {
    UIkit.notification.closeAll();
  }
}
