import { Routes } from '@angular/router';
import {ViewDocComponent} from './components/view-doc/view-doc.component';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

export const routes: Routes = [
  {path: 'docs', component: HomeComponent},
  {path: 'docs/:id', component: ViewDocComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: 'docs', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent},
];
