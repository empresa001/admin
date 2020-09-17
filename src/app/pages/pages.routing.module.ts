
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';


const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import('./chil-routes.module').then(m => m.ChilRoutesModule)
      },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
