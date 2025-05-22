import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

import {IDoc} from '@models/doc.model';

/**
 * Service responsible for transmitting data between components.
 * Uses ReplaySubject to ensure that the last value is issued to new subscribers.
 */
@Injectable({
  providedIn: 'root'
})
export class TransmitterService {
  /**
   * ReplaySubject that stores the transmitted data.
   */
  private dataSubject: ReplaySubject<IDoc | null> = new ReplaySubject<IDoc | null>(1);

  /**
   * Defines the data to be transmitted.
   *
   * @param data - The data of type IDoc or null.
   */
  setData(data: IDoc | null): void {
    this.dataSubject.next(data);
  }

  /**
   * Returns an Observable with the transmitted data.
   *
   * @returns Observable<IDoc | null>
   */
  getData(): Observable<IDoc | null> {
    return this.dataSubject.asObservable();
  }
}
