import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {DocPagination, DocType} from '../../../models/doc.model';
import {ReadFileService} from '../../../services/read-file.service';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  private searchTimeout: any;
  private loadMoreTimeout: any;

  data: DocPagination = {page: 0, pageSize: 0, pageTotal: 0, total: 0, items: []};
  page = 1;
  startPageSize = 10;
  currentPageSize = 10;
  filter = '';

  constructor(private readFileService: ReadFileService) {
  }

  ngOnInit(): void {
    this.loadDocs();
  }

  loadDocs(): void {
    this.readFileService.fetchPaginatedDocs(this.page, this.currentPageSize, this.filter)
      .subscribe((data: DocPagination) => {
        this.data = data;
      });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.currentPageSize = this.startPageSize;

    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.filter = input.value;
      this.loadDocs();
    }, 300);
  }

  loadMore(): void {
    this.currentPageSize += this.startPageSize;

    clearTimeout(this.loadMoreTimeout);
    this.loadMoreTimeout = setTimeout(() => {
      this.loadDocs();
    }, 300);
  }

  protected readonly DocType = DocType;
}
