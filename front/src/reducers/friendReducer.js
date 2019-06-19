import { SEND_FRIEND_REQUEST} from '../actions/types';



export default function friendReducer(state = [], action) {
    switch (action.type) {
        case SEND_FRIEND_REQUEST:
            return [...state, action.payload];
        default:
            return state;
    }
}