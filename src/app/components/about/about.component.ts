import {Component} from '@angular/core';
import {SectionComponent} from '../section/section.component';

@Component({
  standalone: true,
  selector: 'app-about',
  imports: [
    SectionComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
