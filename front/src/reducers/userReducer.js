// authReducer.js

import { DELETE_USER, FETCH_USER_BY_ID } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_USER_BY_ID:
            return action.payload;
        case DELETE_USER:
            return state.filter(user => user._id !== user.id);
        default:
            return state;
    }
}
