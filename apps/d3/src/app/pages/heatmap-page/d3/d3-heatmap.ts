import * as d3 from 'd3';
import { BaseType, ScaleBand } from 'd3';
import { ScaleOrdinal } from 'd3-scale';
import { Selection } from 'd3-selection';
import { DataNode } from './interfaces';
import { d3RootSelect } from './selectors';

export function renderHeatmap( el: HTMLElement, myData: DataNode[] ): void {
  const rootSelector = d3RootSelect(el, '.calendar');

  const calendarRows: Function = function( month ) {
    const m = d3.timeMonth.floor(month);
    return d3.timeWeeks(d3.timeWeek.floor(m), d3.timeMonth.offset(m, 1)).length;
  };

  const minDate = d3.min(myData, function( d: DataNode ) {
    return new Date(d.submissionTime);
  });
  const maxDate = d3.max(myData, function( d: DataNode ) {
    return new Date(d.submissionTime);
  });

  // CELL SIZE
  const cellMargin = 2,
    cellSize = 20;

  // top of calendar days away from Title
  const dayTopMargin = 50;

  const day: (date: Date) => any = d3.timeFormat('%w'),
    week: (date: Date) => any = d3.timeFormat('%U'),
    format: (date: Date) => any = d3.timeFormat('%Y-%m-%d'),
    titleFormat: (date: Date) => any = d3.utcFormat('%a, %d-%b'),
    monthName: (date: Date) => any = d3.timeFormat('%B'),
    months: any = d3.timeMonth.range(d3.timeMonth.floor(minDate), maxDate);

  for(let i=0; i<myData.length; i++){
    myData[i].today =  myData[i].submissionTime.slice(0,10);
  }

// EACH MONTH BLOCK

  rootSelector().selectAll('svg')
  // svg
    .data(months)
    .enter().append('svg')
    .attr('class', 'month')
    .attr('width', (cellSize * 7) + (cellMargin * 8) )
    .attr('height', function(d) {
      const rows = calendarRows(d);
      return (cellSize * rows) + (cellMargin * (rows + 1)) + dayTopMargin; // the 20 is for the month labels
    })
    .append('g');


  // MONTH NAME
  rootSelector().selectAll('g')
  // svg.append('text')
    .append('text')
    .attr('class', 'month-name')
    .attr('x', ((cellSize * 7) + (cellMargin * 8)) / 2 )
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .text(function(d: any) { return monthName(d); });

  // DAY TITLES
  const dayTitles = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];


  rootSelector().selectAll('g')
  // svg
    .selectAll('text.day-title')
    .data(dayTitles)
    .enter()
    .append('text')
    .attr('class', 'day-title')
    .attr('width', cellSize)
    .attr('height', cellSize)
    .attr('x', function(d, i) {
      return i * (cellSize + cellMargin) + 12;
    })
    .attr('y', 45)
    .attr('text-anchor', 'middle')
    .text(function(d) {
      return d; })

  // EACH DAY BLOCK
  rootSelector().selectAll('svg g').selectAll('rect.day')
  // const rect = svg.selectAll('rect.day')
    .data(function(d, i) {
      return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth()+1, 1));
    })
    .enter().append('rect')
    .attr('class', 'day')
    .attr('width', cellSize)
    .attr('height', cellSize)
    .attr('rx', 3).attr('ry', 3) // rounded corners
    .attr('fill', '#ccc') // default light grey fill
    .attr('x', function(d): number {
      return (Number(day(d)) * cellSize) + (Number(day(d)) * cellMargin) + cellMargin;
    })
    .attr('y', function(d: any) {
      return ((week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellSize) +
        ((week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellMargin) +
        cellMargin + dayTopMargin;
    })
    .on('mouseover', function(d) {
      d3.select(this).classed('hover', true);
    })
    .on('mouseout', function(d) {
      d3.select(this).classed('hover', false);
    })
    .datum(format);

  // rect.append('title')
  //   .text(function(d) { return titleFormat(new Date(d)); });

  const lookup = d3.nest()
    .key(function(d: any) { return d.today; })
    .rollup(function(leaves: any) { return leaves.length; })
    .object(myData);

  const count: { key: string; value: number }[] = d3.nest()
    .key(function(d: any) { return d.today; })
    .rollup(function(leaves: any) { return leaves.length; })
    .entries(myData);

  const colourRangeStart = '#fae9e9',
    colourRangeEnd = '#d62728';

  const domain: any = d3.extent(count, function(d: any) { return d.value; });

  const colour = d3.scaleLinear()
    .domain(domain)
    .range(<ReadonlyArray<any>>[colourRangeStart, colourRangeEnd]);


  // const scale = d3.scaleLinear()
  //   .domain(d3.extent(count, function(d) { return d.value; }))
  //   .range([0,1]); // the interpolate used for color expects a number in the range [0,1] but i don't want the lightest part of the color scheme

  rootSelector().selectAll('svg g').selectAll('rect.day')
  // rect
    .filter(function(d) { return d in lookup; })
    //     .style('fill', function(d) { console.log(colour(lookup[d])); return d3.interpolatePuBu(colour(lookup[d])); })
    .style('fill', function(d) {  return colour(lookup[d]); })
    .classed('clickable', true)
    .on('click', function(d){
      if(d3.select(this).classed('focus')){
        d3.select(this).classed('focus', false);
      } else {
        d3.select(this).classed('focus', true)
      }
      // doSomething();
    })
    .select('title')
    .text(function(d) { return titleFormat(new Date(d)) + ':  ' + lookup[d]; });

}
