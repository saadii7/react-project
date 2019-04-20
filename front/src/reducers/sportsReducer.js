import {ADD_SPORT, DELETE_SPORT, FETCH_ALL_SPORTS } from '../actions/types';

export default function sportReducer(state = [], action) {
  switch (action.type) {
    case ADD_SPORT:
      return [...state, action.payload];
    case DELETE_SPORT:
      return ({
        ...state,
        sports:state.filter(sport => sport._id !== action.payload.id)
      });
      case FETCH_ALL_SPORTS:
      return action.sports;
    default:
      return state;
  }
}