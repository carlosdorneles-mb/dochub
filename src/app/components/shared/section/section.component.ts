import {Component, HostListener, OnInit} from '@angular/core';
import {trigger, transition, style, animate} from '@angular/animations';
import {NgIf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-section',
  imports: [
    NgIf
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(20px)'}),
        animate('400ms ease', style({opacity: 1, transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        animate('300ms ease', style({opacity: 0, transform: 'translateY(20px)'}))
      ])
    ])
  ]
})
export class SectionComponent implements OnInit {
  showMore = false;
  isDesktop = false;

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth >= 960;
  }

  ngOnInit() {
    this.isDesktop = window.innerWidth >= 960;
  }
}
