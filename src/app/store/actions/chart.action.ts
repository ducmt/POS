import { Action } from '@ngrx/store';

export const LOAD_CHART = 'LOAD_CHART';

export const ADD_CHART = 'ADD_CHART';

export class LoadChart implements Action {
  readonly type = LOAD_CHART;
  constructor(public payload) { }
}

export class AddChart implements Action {
  readonly type = ADD_CHART;
  constructor(public payload) {}
}

export type ChartAction = LoadChart | AddChart;
