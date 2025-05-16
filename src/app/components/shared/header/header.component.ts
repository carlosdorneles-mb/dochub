import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {TransmitterService} from '@services/transmitter.service';
import {IDoc} from '@models/doc.model';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();

  protected data: IDoc | null = null;
  protected searchQuery = '';

  constructor(
    private router: Router,
    private transmitterService: TransmitterService,
  ) {
  }

  ngOnInit(): void {
    this.transmitterService.getData().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.data = data;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  navigateToSearch(): void {
    this.router.navigate(['/search'], {queryParams: {q: this.searchQuery}});
  }
}
