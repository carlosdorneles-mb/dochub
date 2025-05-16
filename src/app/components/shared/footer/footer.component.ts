import {Component, OnInit} from '@angular/core';
import {environment} from '@env/environment';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  repository = environment.repository;
  rotate = false;
  appVersion = environment.version;

  ngOnInit() {
    setInterval(() => {
      this.rotate = true;
      setTimeout(() => this.rotate = false, 1000); // duração da animação: 1s
    }, 10000); // a cada 10s
  }
}
