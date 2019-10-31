import { ADD_EVENT, FETCH_ALL_EVENTS, ADD_PLAYERS_AT_EVENT, DELETE_EVENT } from '../actions/types';

const initialState = {
    // event: {},
    events: [],
};

export default function eventReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_EVENT:
            return {
                ...state,
                events: [...state.events, action.payload]
            };
        case ADD_PLAYERS_AT_EVENT:
            return action.payload;

        case FETCH_ALL_EVENTS:
            return { events: action.event };

        case DELETE_EVENT:
            return { events: state.events.filter(event => event._id !== action.id) }
        default:
            return state;
    }
}
