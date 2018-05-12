import { LoadData, LOAD_DATA } from '../actions/data.action';

/**
 * Define function for use ngrx/store
 *
 * @param state Keep listing of buildings
 * @param action BuildingAction
 * @return boolean
 */
export function dataReducer(state = [], action: LoadData) {
  switch (action.type) {
    case LOAD_DATA:
      return action.payload;

    default:
      return state;
  }
}
