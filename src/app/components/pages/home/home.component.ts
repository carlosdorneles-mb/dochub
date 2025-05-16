import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from '@angular/common';

import {SectionComponent} from '@components/shared/section/section.component';
import {FooterComponent} from "@components/shared/footer/footer.component";
import {TableComponent} from '@components/shared/table/table.component';

import {StorageService} from '@services/storage.service';

import {TabType} from '@models/tab.model';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    SectionComponent,
    TableComponent,
    FooterComponent,
    NgIf,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  readonly TabType = TabType;
  private queryTabSelectedKey = 'tab';

  tabSelected = this.TabType.All;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectTab(
        params[this.queryTabSelectedKey] || this.storageService.getTabSelected() || this.tabSelected
      )
    });
  }

  selectTab(tab: TabType): void {
    this.tabSelected = tab;
    this.storageService.setTabSelected(tab);
    this.updateQueryString(this.queryTabSelectedKey, this.tabSelected)
  }

  updateQueryString(param: string, value: string): void {
    this.router.navigate([], {
      queryParams: {[param]: value},
      queryParamsHandling: 'merge'
    });
  }
}
