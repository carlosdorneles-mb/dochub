import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {IDocPagination} from '@models/doc.model';
import {ReadFileService} from '@services/read-file.service';
import {StorageService} from '@services/storage.service';
import {TabType} from '@models/tab.model';
import {LoadingComponent} from '@components/loading/loading.component';

declare const UIkit: any;

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
  protected lastVisitedIds: number[] = [];
  protected searchFilter = '';

  @Output() searchFilterChange = new EventEmitter<string>();
  @Input() tabTypeSelected = this.TabType.All;

  @Input()
  set searchFilterValue(value: string) {
    this.searchFilter = value || '';
    this.onSearchByValue(this.searchFilter);
  }

  get searchFilterValue(): string {
    return this.searchFilter;
  }

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
    this.loadDocs();
  }

  loadMore(): void {
    this.isLoadingLoadMore = true;
    this.currentPageSize += this.startPageSize;
    this.loadDocs();
  }

  loadDocs(): void {
    this.refreshFavoriteIds()
    this.refreshLastVisitedIds()

    if (this.tabTypeSelected === TabType.LastVisited) {
      this.readFileService.fetchPaginatedByIds({
        page: this.page,
        pageSize: this.currentPageSize,
        ids: this.lastVisitedIds,
      })
        .subscribe((data: IDocPagination) => {
          this.data = data;
          this.isNotFoundData = this.data.total === 0;
          this.isLoadingTable = false;
          this.isLoadingLoadMore = false;
        });
      return;
    }

    if (this.tabTypeSelected === TabType.Favorite) {
      this.readFileService.fetchPaginatedByIds({
        page: this.page,
        pageSize: this.currentPageSize,
        ids: this.favoriteIds,
      })
        .subscribe((data: IDocPagination) => {
          this.data = data;
          this.isNotFoundData = this.data.total === 0;
          this.isLoadingTable = false;
          this.isLoadingLoadMore = false;
        });
      return;
    }

    if (this.tabTypeSelected === TabType.Fixed) {
      this.readFileService.fetchPaginatedDocsFixed({
        page: this.page,
        pageSize: this.currentPageSize,
      })
        .subscribe((data: IDocPagination) => {
          this.data = data;
          this.isNotFoundData = this.data.total === 0;
          this.isLoadingTable = false;
          this.isLoadingLoadMore = false;
        });
      return;
    }

    this.readFileService.fetchPaginatedDocs({
      page: this.page,
      pageSize: this.currentPageSize,
      filter: this.searchFilter,
    })
      .subscribe((data: IDocPagination) => {
        this.data = data;
        this.isNotFoundData = this.data.items.length === 0;
        this.isLoadingTable = false;
        this.isLoadingLoadMore = false;
      });
  }

  managerFavorite(id: number) {
    if (this.isFavorite(id)) {
      this.storageService.removeFavoriteId(id);
      this.toastMessage('Documentação removida dos favoritos');
    } else {
      this.storageService.setFavoriteId(id);
      this.toastMessage('Documentação adicionada aos favoritos');
    }
    this.refreshFavoriteIds()

  }

  refreshFavoriteIds() {
    this.favoriteIds = this.storageService.getFavoriteIds();
  }

  refreshLastVisitedIds() {
    this.lastVisitedIds = this.storageService.getLastVisitedIds();
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds.includes(id);
  }

  toastMessage(message: string) {
    UIkit.notification({message: message, pos: 'top-right', status: 'primary'})
  }
}
