import {ADD_SPORT, DELETE_SPORT, FETCH_SPORT } from '../actions/types';

export default function sportReducer(state = [], action) {
  switch (action.type) {
    case ADD_SPORT:
      return [...state, action.payload];
    case DELETE_SPORT:
      return state.filter(sport => sport._id !== action.payload.id);
      case FETCH_SPORT:
      return action.sports;
    default:
      return state;
  }
}