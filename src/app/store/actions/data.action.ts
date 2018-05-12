import { Action } from '@ngrx/store';

export const LOAD_DATA = 'LOAD_DATA';

export class LoadData implements Action {
  readonly type = LOAD_DATA;
  constructor(public payload) {}
}

export type BuildingAction = LoadData;
