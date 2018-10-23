import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeatmapPageRoutingModule } from './heatmap-page-routing.module';
import { HeatmapPageComponent } from './heatmap-page.component';

@NgModule({
  imports: [
    CommonModule,
    HeatmapPageRoutingModule
  ],
  declarations: [HeatmapPageComponent],
  exports: [HeatmapPageComponent]
})
export class HeatmapPageModule { }