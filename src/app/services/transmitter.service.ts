import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

import {IDoc} from '@models/doc.model';

@Injectable({
  providedIn: 'root'
})
export class TransmitterService {
  private dataSubject: ReplaySubject<IDoc | null> = new ReplaySubject<IDoc | null>(1);

  setData(data: IDoc | null): void {
    this.dataSubject.next(data);
  }

  getData(): Observable<IDoc | null> {
    return this.dataSubject.asObservable();
  }
}
