import { ChartAction, LOAD_CHART, ADD_CHART } from '../actions/chart.action';

/**
 * Define function for use ngrx/store
 *
 * @param state Keep listing of buildings
 * @param action BuildingAction
 * @return boolean
 */
export function chartReducer(state = [], action: ChartAction) {
  switch (action.type) {
    case LOAD_CHART:
      return action.payload;
    case ADD_CHART:
      state.push(action.payload);
      return state;
    default:
      return state;
  }
}
