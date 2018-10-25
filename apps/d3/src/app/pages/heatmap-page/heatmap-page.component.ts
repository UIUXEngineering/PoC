import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { renderHeatmap } from './d3/d3-heatmap';
import { data } from './d3/mock-data';

@Component({
  selector: 'ix-heatmap-page',
  templateUrl: './heatmap-page.component.html',
  styleUrls: ['./heatmap-page.component.scss']
})
export class HeatmapPageComponent implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    renderHeatmap(this.el.nativeElement, data)
  }

}
