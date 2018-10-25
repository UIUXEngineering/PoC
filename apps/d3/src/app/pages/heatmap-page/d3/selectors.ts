import { Selection } from 'd3';
import * as d3 from 'd3';

export function d3RootSelect(el: HTMLElement, selector: string): Function  {
  return function(): Selection<any, any, any, any> {
    return d3.select(el.querySelector(selector));
  }
}
