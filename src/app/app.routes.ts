import {Routes} from '@angular/router';

import {ViewComponent} from '@components/pages/view/view.component';
import {HomeComponent} from '@components/pages/home/home.component';
import {NotFoundComponent} from '@components/pages/not-found/not-found.component';
import {SearchComponent} from '@components/pages/search/search.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'docs/:id', component: ViewComponent},
  {path: 'search', component: SearchComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent},
];
