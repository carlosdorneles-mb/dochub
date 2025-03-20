import {Routes} from '@angular/router';

import {ViewDocComponent} from '@components/view-doc/view-doc.component';
import {HomeComponent} from '@components/home/home.component';
import {NotFoundComponent} from '@components/not-found/not-found.component';
import {SearchComponent} from '@components/search/search.component';

export const routes: Routes = [
  {path: 'docs', component: HomeComponent},
  {path: 'docs/:id', component: ViewDocComponent},
  {path: 'search', component: SearchComponent},
  {path: 'home', redirectTo: 'docs', pathMatch: 'full'},
  {path: '', redirectTo: 'docs', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent},
];
