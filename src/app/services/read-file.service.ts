import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';

import {IDoc, IDocPagination} from '@models/doc.model';

/**
 * Service to read and manipulate documentation files.
 */
@Injectable({
  providedIn: 'root'
})
export class ReadFileService {
  private fetchDocs() {
    return new Observable<IDoc[]>(observer => {
      observer.next(environment.docs);
      observer.complete();
    });
  }

  fetchPaginatedDocs(
    {
      page,
      pageSize,
      filter,
      group = '',
      order = 'id',
      sort = 'asc',
      randomOrder = false,
    }: {
      page: number;
      pageSize: number;
      filter: string;
      group: string;
      order?: string;
      sort?: string;
      randomOrder?: boolean;
    }
  ): Observable<IDocPagination> {
    return this.fetchDocs().pipe(
      map(docs => docs.filter(
        doc =>
          (!group || doc.group.toLowerCase() === group.toLowerCase()) &&
          (
            doc.id.toString().includes(filter)
            || doc.name.toLowerCase().includes(filter.toLowerCase())
            || doc.group.toLowerCase().includes(filter.toLowerCase())
            || doc.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
          )
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
    const fieldA = a[order as keyof IDoc] as string | number;
    const fieldB = b[order as keyof IDoc] as string | number;

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
