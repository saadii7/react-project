import { ADD_EVENT,FETCH_ALL_EVENTS} from '../actions/types';



export default function eventReducer(state = [], action) {
    switch (action.type) {
        case ADD_EVENT:
            return [...state, action.payload];
        case FETCH_ALL_EVENTS:
            return action.event;
        default:
            return state;
    }
}