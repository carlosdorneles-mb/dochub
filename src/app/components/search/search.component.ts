import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableComponent} from '@components/table/table.component';

@Component({
  selector: 'app-search',
  imports: [
    TableComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  protected queryFilterName = 'q'
  protected queryFilterValue = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.queryFilterValue = params[this.queryFilterName]
    });
  }

  updateQueryString(param: string, value: string): void {
    this.router.navigate([], {
      queryParams: {[param]: value},
      queryParamsHandling: 'merge' // mantém os parâmetros existentes na query string
    });
  }
}
