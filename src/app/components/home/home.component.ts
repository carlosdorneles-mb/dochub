import {Component} from '@angular/core';
import {SectionComponent} from '../section/section.component';
import {TableComponent} from './table/table.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    SectionComponent,
    TableComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
