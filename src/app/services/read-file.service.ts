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

  fetchPaginatedDocs(
    {
      page,
      pageSize,
      filter,
      order = 'id',
      sort = 'asc',
      randomOrder = false,
    }: {
      page: number;
      pageSize: number;
      filter: string;
      order?: string;
      sort?: string;
      randomOrder?: boolean;
    }
  ): Observable<IDocPagination> {
    return this.fetchDocs().pipe(
      map(docs => docs.filter(
        doc =>
          doc.id.toString().includes(filter)
          || doc.name.toLowerCase().includes(filter.toLowerCase())
          || doc.group.toLowerCase().includes(filter.toLowerCase())
          || doc.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
      )),
      map(docs => {
        if (randomOrder) {
          // Shuffle the docs array randomly
          for (let i = docs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [docs[i], docs[j]] = [docs[j], docs[i]];
          }
        } else {
          // Sort the docs based on the order and sort parameters
          docs.sort((a, b) => this.sortDocs(a, b, order, sort));
        }
        return this.paginateDocs(docs, page, pageSize);
      })
    );
  }

  fetchPaginatedDocsFixed(
    {
      page,
      pageSize,
      order = 'id',
      sort = 'asc',
    }: {
      page: number;
      pageSize: number;
      order?: string;
      sort?: string;
    }
  ): Observable<IDocPagination> {
    return this.fetchDocs().pipe(
      map(docs => docs.filter(doc => doc.fixed)),
      map(docs => {
        // Sort the docs based on the order and sort parameters
        docs.sort((a, b) => this.sortDocs(a, b, order, sort));
        return this.paginateDocs(docs, page, pageSize);
      })
    );
  }

  fetchPaginatedByIds(
    {
      page,
      pageSize,
      ids,
    }: {
      page: number;
      pageSize: number;
      ids: number[];
    }
  ): Observable<IDocPagination> {
    return this.fetchDocs().pipe(
      map(docs => docs.filter(
        doc => ids.length > 0 && ids.includes(doc.id)
      )),
      map(docs => {
        // Sort the docs based on the order of ids
        docs.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
        return this.paginateDocs(docs, page, pageSize);
      })
    );
  }

  fetchDocById(id: number): Observable<IDoc | undefined> {
    return this.fetchDocs().pipe(
      map(docs => docs.find(doc => doc.id === id))
    );
  }

  private sortDocs(a: IDoc, b: IDoc, order: string, sort: string): number {
    const fieldA = a[order as keyof IDoc];
    const fieldB = b[order as keyof IDoc];

    if (sort === 'asc') {
      return fieldA > fieldB ? 1 : fieldA < fieldB ? -1 : 0;
    } else {
      return fieldA < fieldB ? 1 : fieldA > fieldB ? -1 : 0;
    }
  }

  private paginateDocs(docs: IDoc[], page: number, pageSize: number): IDocPagination {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      page: page,
      pageSize: pageSize,
      pageTotal: Math.ceil(docs.length / pageSize),
      total: docs.length,
      items: docs.slice(start, end)
    };
  }
}
