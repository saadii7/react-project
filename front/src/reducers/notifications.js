import { MAKE_FRIEND_REQUEST, CHECK_NOTIFICATIONS, ADD_NOTIFICATION, DELETE_NOTIFICATION } from '../actions/types';

export default function reducer(state = [], action) {
    switch (action.type) {
        case MAKE_FRIEND_REQUEST:
            return [...state, action.payload];
        case CHECK_NOTIFICATIONS:
            return action.payload;
        case ADD_NOTIFICATION:
            return [action.payload];
        // case DELETE_NOTIFICATION:
        //     console.log("DELETE_NOTIFICATION------1")
        //     return state.filter(notifications => notifications._id !== action.id)
        //     // console.log("DELETE_NOTIFICATION------2")

        default:
            return state;
    }
}
