import { ADD_TEAM, FETCH_TEAM,FETCH_ALL_TEAMS,DELETE_TEAM} from '../actions/types';

export default function postReducer(state = [], action) {
    switch (action.type) {
        case ADD_TEAM:
            return [...state, action.payload];
        case FETCH_TEAM:
            return action.payload
        case FETCH_ALL_TEAMS:
            return action.payload
        case DELETE_TEAM:
            return state.filter(team => team._id !== team.id);

        default:
            return state;
    }
}
