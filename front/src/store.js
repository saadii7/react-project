import { createStore, applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import {fetchAllSports} from './actions/sports';
const inititalState = {};

const store = createStore(
        rootReducer,
        inititalState,
        compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));
        // applyMiddleware(thunk));

store.dispatch(fetchAllSports());


// store.dispatch(getUser());
export default store;