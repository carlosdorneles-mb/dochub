import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {IDoc, IDocPagination} from '@models/doc.model';

@Injectable({
  providedIn: 'root'
})
export class ReadFileService {
  constructor(private http: HttpClient) {
  }

  private fetchDocs() {
    return this.http.get<IDoc[]>('assets/docs.json');
  }

  fetchPaginatedDocs(page: number, pageSize: number, filter: string): Observable<IDocPagination> {
    return this.fetchDocs().pipe(
      map(docs => docs.filter(
        doc =>
          doc.id.toString().includes(filter)
          || doc.name.toLowerCase().includes(filter.toLowerCase())
          || doc.group.toLowerCase().includes(filter.toLowerCase())
          || doc.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
      )),
      map(docs => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return {
          page: page,
          pageSize: pageSize,
          pageTotal: Math.ceil(docs.length / pageSize),
          total: docs.length,
          items: docs.slice(start, end)
        };
      })
    );
  }

  fetchPaginatedDocsFixed(page: number, pageSize: number): Observable<IDocPagination> {
    return this.fetchDocs().pipe(
      map(docs => docs.filter(doc => doc.fixed)),
      map(docs => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return {
          page: page,
          pageSize: pageSize,
          pageTotal: Math.ceil(docs.length / pageSize),
          total: docs.length,
          items: docs.slice(start, end)
        };
      })
    );
  }

  fetchPaginatedByIds(page: number, pageSize: number, ids: number[]): Observable<IDocPagination> {
    return this.fetchDocs().pipe(
      map(docs => docs.filter(
        doc => ids.length > 0 && ids.includes(doc.id)
      )),
      map(docs => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return {
          page: page,
          pageSize: pageSize,
          pageTotal: Math.ceil(docs.length / pageSize),
          total: docs.length,
          items: docs.slice(start, end)
        };
      })
    );
  }

  fetchDocById(id: number): Observable<IDoc | undefined> {
    return this.fetchDocs().pipe(
      map(docs => docs.find(doc => doc.id === id))
    );
  }
}
