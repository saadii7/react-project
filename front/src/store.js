import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/index';
import {fetchAllSports} from './actions/sports';
// import {getUser} from './actions/user';
const inititalState = {};

const store = createStore(
        rootReducer, 
        inititalState, 
        compose(applyMiddleware(thunk), 
                window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));
store.dispatch(fetchAllSports());
// store.dispatch(getUser());
export default store;