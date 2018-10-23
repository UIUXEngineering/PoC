import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeatmapPageComponent } from './heatmap-page.component';

const routes: Routes = [
  {
    path: '',
    component: HeatmapPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeatmapPageRoutingModule { }
