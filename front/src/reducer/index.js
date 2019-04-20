// index.js

import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import sportsReducer from './sportsReducer';
import userReducer from './userReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    sports:sportsReducer,
    user:userReducer
    

});
