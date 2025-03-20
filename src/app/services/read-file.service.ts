import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doc, DocPagination } from '../models/doc.model';

@Injectable({
  providedIn: 'root'
})
export class ReadFileService {
  constructor(private http: HttpClient) {}

  fetchPaginatedDocs(page: number, pageSize: number, filter: string): Observable<DocPagination> {
    return this.http.get<Doc[]>('assets/docs.json').pipe(
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

  fetchDocById(id: number): Observable<Doc | undefined> {
    return this.http.get<Doc[]>('assets/docs.json').pipe(
      map(docs => docs.find(doc => doc.id === id))
    );
  }
}
