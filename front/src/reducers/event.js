import {FETCH_EVENT_BY_ID} from '../actions/types';

// const initialState = {
//     event: {},
// };

export default function eventReducer(state ={}, action) {
    switch (action.type) {
        case FETCH_EVENT_BY_ID:
            return action.event;

        default:
            return state;
    }
}
