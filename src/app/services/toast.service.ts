import {Injectable} from '@angular/core';

declare const UIkit: any;

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message(message: string) {
    UIkit.notification({message: message, pos: 'top-right', status: 'primary'})
  }
}
