import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

import {IDoc} from '@models/doc.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private dataSubject: ReplaySubject<IDoc> = new ReplaySubject<IDoc>(1);

  setData(data: IDoc): void {
    this.dataSubject.next(data);
  }

  getData$(): Observable<IDoc> {
    return this.dataSubject.asObservable();
  }
}
