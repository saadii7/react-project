import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import {fetchAllSports} from './actions/sports';
// import {getUser} from './actions/user';
const inititalState = {};

const store = createStore(
        rootReducer,
        inititalState,
        compose(applyMiddleware(thunk)));
store.dispatch(fetchAllSports());

// store.dispatch(getUser());
export default store;