// authReducer.js

import { SET_CURRENT_USER, UPDATE_USER, FORGOT_PASSWORD, RESET_PASSWORD } from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case UPDATE_USER:
            return {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case FORGOT_PASSWORD:
            return {
                user: action.payload
            }
        case RESET_PASSWORD:
            return {
                user: action.payload
            }

        default:
            return state;
    }
}
