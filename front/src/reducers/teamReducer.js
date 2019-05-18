import { ADD_TEAM,FETCH_TEAM} from '../actions/types';



export default function postReducer(state = [], action) {
    switch (action.type) {
        case ADD_TEAM:
            return [...state, action.payload];
        case FETCH_TEAM:
            return action.payload
        default:
            return state;
    }
}