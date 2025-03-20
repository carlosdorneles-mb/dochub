import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';

import {SharedService} from '../../services/shared.service';
import {Doc} from '../../models/doc.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  data: Doc | null = null;
  private unsubscribe = new Subject<void>();

  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.sharedService.getData$().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.data = data;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
