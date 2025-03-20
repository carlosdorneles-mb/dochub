import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {IDocPagination} from '@models/doc.model';
import {ReadFileService} from '@services/read-file.service';
import {StorageService} from '@services/storage.service';
import {TabType} from '@models/tab.model';
import {LoadingComponent} from '@components/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    LoadingComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  readonly TabType = TabType;

  protected isLoadingLoadMore = false;
  protected isLoadingTable = true;
  protected isNotFoundData = false;

  protected data: IDocPagination = {page: 0, pageSize: 0, pageTotal: 0, total: 0, items: []};
  protected page = 1;
  protected startPageSize = 20;
  protected currentPageSize = 10;
  protected favoriteIds: number[] = [];

  @Input() tabTypeSelected = this.TabType.All;
  @Input() searchFilter = '';
  @Output() searchFilterChange = new EventEmitter<string>();

  constructor(
    private readFileService: ReadFileService,
    private storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    this.onSearchByValue(this.searchFilter);
  }

  onSearchByEvent(event: Event): void {
    this.onSearchByValue((event.target as HTMLInputElement).value)
  }

  onSearchByValue(value: string): void {
    this.isLoadingTable = true;
    this.currentPageSize = this.startPageSize;  // reset page size
    this.searchFilter = value;
    this.searchFilterChange.emit(value);
    this.loadIDocs();
  }

  loadMore(): void {
    this.isLoadingLoadMore = true;
    this.currentPageSize += this.startPageSize;
    this.loadIDocs();
  }

  loadIDocs(): void {
    this.favoriteIds = this.storageService.getFavoriteIds();

    if (this.tabTypeSelected === TabType.Favorite) {
      this.readFileService.fetchPaginatedByIds(this.page, this.currentPageSize, this.storageService.getFavoriteIds())
        .subscribe((data: IDocPagination) => {
          this.data = data;
          this.isNotFoundData = this.data.total === 0;
          this.isLoadingTable = false;
          this.isLoadingLoadMore = false;
        });
      return;
    }

    this.readFileService.fetchPaginatedIDocs(this.page, this.currentPageSize, this.searchFilter)
      .subscribe((data: IDocPagination) => {
        this.data = data;
        this.isNotFoundData = this.data.items.length === 0;
        this.isLoadingTable = false;
        this.isLoadingLoadMore = false;
      });
  }

  managerFavorite(id: number) {
    if (this.storageService.getFavoriteIds().includes(id)) {
      return this.storageService.removeFavoriteId(id);
    }
    this.storageService.setFavoriteId(id);
  }
}
