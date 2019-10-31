import {
    ADD_GROUND,
    FETCH_GROUND,
    FETCH_ALL_GROUNDS,
    DELETE_GROUND,
} from '../actions/types';

const initialState = {
    grounds: [],
    ground: {}
};
export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_GROUND:
            return {
                ...state,
                grounds: [...state.grounds, action.payload]
            };
        case FETCH_GROUND:
            return {
                ...state,
                ground: action.payload
            };
        case FETCH_ALL_GROUNDS:
            return {
                ...state,
                grounds: action.payload
            };
        case DELETE_GROUND:
            return {grounds:state.grounds.filter(ground => ground._id !== action.id)};
        default:
            return state;
    }
}
