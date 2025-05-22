import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {DocTypeEnum, IDoc, IDocPagination} from '@models/doc.model';
import {TabType} from '@models/tab.model';

import {ReadFileService} from '@services/read-file.service';
import {StorageService} from '@services/storage.service';
import {ToastService} from '@services/toast.service';
import {ShareService} from '@services/share.service';

import {LoadingComponent} from '@components/shared/loading/loading.component';
import {GroupEnum} from '@env/docs';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [
    CommonModule,
    FormsModule,
    LoadingComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  protected readonly TabType = TabType;
  protected readonly GroupEnum = GroupEnum;

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

  protected groupSelected = '';

  protected currentOrder = 'id';
  protected isAscending = true;

  // tab selected
  @Input() tabTypeSelected = this.TabType.All;

  // filter by query
  @Output() searchFilterChange = new EventEmitter<string>();

  @Input()
  set searchFilterValue(value: string) {
    this.onSearchByValue(value || '');
  }

  get searchFilterValue(): string {
    return this.searchFilter;
  }

  // filter by group
  @Output() searchFilterGroupChange = new EventEmitter<string>();

  @Input()
  set searchFilterGroupValue(value: string) {
    this.onSearchByGroupValue(value || '');
  }

  get searchFilterGroupValue(): string {
    return this.groupSelected;
  }

  constructor(
    private router: Router,
    private readFileService: ReadFileService,
    private storageService: StorageService,
    private toastService: ToastService,
    private shareService: ShareService,
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

  onSearchByGroupEvent(event: Event): void {
    this.onSearchByGroupValue((event.target as HTMLInputElement).value)
  }

  onSearchByGroupValue(value: string): void {
    this.isLoadingTable = true;
    this.groupSelected = value;
    this.searchFilterGroupChange.emit(value);
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
        order: this.currentOrder,
        sort: this.isAscending ? 'asc' : 'desc',
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
      group: this.groupSelected,
      order: this.currentOrder,
      sort: this.isAscending ? 'asc' : 'desc',
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
      this.toastService.message('Documentação removida dos favoritos');
    } else {
      this.storageService.setFavoriteId(id);
      this.toastService.message('Documentação adicionada aos favoritos');
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

  sortTable(column: string): void {
    if (this.currentOrder === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.currentOrder = column;
      this.isAscending = true;
    }
    this.loadDocs();
  }

  share(id: number): void {
    this.shareService.share(id);
  }

  viewDoc(event: Event, doc: IDoc) {
    event.preventDefault();

    if ((event as MouseEvent).ctrlKey && doc.reference.type === DocTypeEnum.Link) {
      window.open(doc.reference.source, '_blank');
      return;
    }

    this.router.navigate([`/docs/${doc.id}`]);
  }
}
