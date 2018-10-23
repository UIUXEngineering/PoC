import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home-page',
    loadChildren: 'apps/d3/src/app/pages/home-page/home-page.module#HomePageModule',
  },
  {
    path: 'heatmap-page',
    loadChildren: 'apps/d3/src/app/pages/heatmap-page/heatmap-page.module#HeatmapPageModule',
  },
  {
    path: '',
    redirectTo: '/home-page',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home-page',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
