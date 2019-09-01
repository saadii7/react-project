import {
    ADD_TEAM_PLAYER,
    FETCH_TEAM_PLAYER
} from '../actions/types';

// const initialState = {
// };

export default function postReducer(state =[], action) {
    switch (action.type) {
        // case ADD_TEAM:
        //     return {
        //         ...state,
        //         teams: [...state.teams, action.payload]
        //     };
        
        case FETCH_TEAM_PLAYER:
            return action.payload
        // case ADD_TEAM_PLAYER:
        // return { 
        //         ...state,
        //         teams: [ ...state.teams,action.payload]
        // }

        // case DELETE_TEAM:
        //     return state.filter(team => team._id !== team.id);
        default:
            return state;
    }
}
