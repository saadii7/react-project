import {
    ADD_TEAM_PLAYER,
    FETCH_TEAM_PLAYER,
    CHECK_TEAM_PLAYERS
} from '../actions/types';

const initialState = {
    player: {},
    players: [],
    Non_faulty_players: [],
    team_players: []
};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        // case ADD_TEAM:
        //     return {
        //         ...state,
        //         teams: [...state.teams, action.payload]
        //     };

        case FETCH_TEAM_PLAYER:
            return {
                team_players: action.payload
            }

        case CHECK_TEAM_PLAYERS:
            return { Non_faulty_players: action.payload }

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
