import {Injectable} from '@angular/core';

/**
 * Service responsible for sending a push notification to the user.
 */
@Injectable({
  providedIn: 'root'
})
export class PushService {
  /**
   * Sends a push notification to the user.
   *
   * @param params - An object containing notification options.
   * @param params.title - The title of the notification.
   * @param params.message - The message body of the notification.
   * @param params.icon - (Optional) The icon URL for the notification.
   * @param params.requireInteraction - (Optional) Whether the notification should remain active until the user interacts with it.
   * @param params.onClick - (Optional) Callback function to execute when the notification is clicked.
   */
  send(
    {
      title,
      message,
      icon = 'icons/icon-72x72.png',
      requireInteraction = true,
      onClick = () => { /* noop */
      },
    }: {
      title: string;
      message: string;
      icon?: string;
      requireInteraction?: boolean;
      onClick?: () => void;
    }
  ): void {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const notification = new Notification(title, {
          body: message,
          icon: icon,
          requireInteraction: requireInteraction,
        });
        notification.onclick = onClick;
      }
    })
  }
}
