// index.js

import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import sportsReducer from './sportsReducer';
import userReducer from './userReducer';
import teamReducer from './teamReducer';
import eventReducer from './eventReducer';
export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    sports:sportsReducer,
    users:userReducer,
    team:teamReducer,
    event:eventReducer
});
