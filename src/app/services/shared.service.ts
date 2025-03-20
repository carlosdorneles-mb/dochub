import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Doc} from '../models/doc.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private dataSubject: ReplaySubject<Doc> = new ReplaySubject<Doc>(1);

  setData(data: Doc): void {
    this.dataSubject.next(data);
  }

  getData$(): Observable<Doc> {
    return this.dataSubject.asObservable();
  }
}
