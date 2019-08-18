import {
    ADD_TEAM,
    FETCH_TEAM,
    FETCH_ALL_TEAMS,
    DELETE_TEAM,
    ADD_TEAM_PLAYER,
    FETCH_TEAM_PLAYER
} from '../actions/types';

const initialState = {
    teams: [],
    team: {},
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
        // return Object.assign({}, state, { users: state.teams.map(teams => {
        //     if (teams.teams.id !== action.payload) return teams;
        //     return Object.assign({}, teams, { users: teams.users.map(node => {
        //       if (node.id !== action.payload) return node;
        //       return Object.assign({}, node, { users: node.users.concat(teams) });
        //     })});
        //   })});
        // case FETCH_TEAM_PLAYER:
        //     return  action.payload

        case DELETE_TEAM:
            return state.filter(team => team._id !== team.id);
        default:
            return state;
    }
}
