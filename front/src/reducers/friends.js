import { FETCH_ALL_FRIENDS } from '../actions/types';

export default function friends(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_FRIENDS:
            return action.payload;
        default:
            return state;
    }
}
