// index.js

import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import sportsReducer from './sportsReducer';
import userReducer from './userReducer';
import teamReducer from './teamReducer';
import eventReducer from './eventReducer';
import usersReducer from './usersReducer';
import notifications from './notifications';
import friends from './friends';
export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    sports: sportsReducer,
    user: userReducer,
    teams: teamReducer,
    event: eventReducer,
    users: usersReducer,
    notifications:notifications,
    friends:friends
});
