import {Component} from '@angular/core';
import {environment} from '@env/environment';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  repository = environment.repository;
}
