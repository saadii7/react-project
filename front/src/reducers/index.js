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
import event from './event';
import players from './Players';
import ground from './ground';
export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    sports: sportsReducer,
    user: userReducer,
    teams: teamReducer,
    event: eventReducer,
    singleEvent:event,
    users: usersReducer,
    notifications:notifications,
    friends:friends,
    players:players,
    ground:ground,
});
