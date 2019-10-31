import {ADD_SPORT, DELETE_SPORT, FETCH_ALL_SPORTS,UPDATE_SPORT} from '../actions/types';

export default function sportReducer(state = [], action) {
  switch (action.type) {
    case ADD_SPORT:
      return [...state, action.payload];
    case DELETE_SPORT:
      return state.filter(sports => sports._id !== action.id);
    case FETCH_ALL_SPORTS:
      return action.sports;
    case UPDATE_SPORT:
      return [...state, action.sports];

    default:
      return state;
  }
}