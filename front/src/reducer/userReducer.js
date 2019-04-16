// authReducer.js

import {FETCH_USER_BY_ID } from '../actions/types';

// export default function(state = [], action ) {
//     switch(action.type) {
//         case GET_CURRENT_USER:
//             return  action.user
//         default:    
//             return state;
//     }
// }

// const initialState = {
//     isAuthenticated: false,
//     users: {},
// }
//For Getting user by Id
export default function(state =[], action){
    switch (action.type) {
      // Handle fetch by Id
      case FETCH_USER_BY_ID:
        return action.payload
      default:
        return state;
    }
  };