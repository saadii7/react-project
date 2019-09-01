import {
    ADD_TEAM,
    FETCH_TEAM,
    FETCH_ALL_TEAMS,
    DELETE_TEAM,
} from '../actions/types';

const initialState = {
    teams: [],
    team: {}
};
export default function postReducer(state = initialState, action) {
    switch (action.type) {
        // case ADD_TEAM:
        //     return {
        //         ...state,
        //         teams: [...state.teams, action.payload]
        //     };
        case FETCH_TEAM:
            return {
                ...state,
                team: action.payload
            };
        case FETCH_ALL_TEAMS:
            return {
                ...state,
                teams: action.payload
            };
        // case ADD_TEAM_PLAYER:
        // return { 
        //         ...state,
        //         teams: [ ...state.teams,action.payload]
        // }

        case DELETE_TEAM:
            return state.filter(team => team._id !== team.id);
        default:
            return state;
    }
}
