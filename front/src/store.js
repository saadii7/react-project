import { createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const inititalState = {};

const store = createStore(
        rootReducer,
        inititalState,
        compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));
        // applyMiddleware(thunk));
<<<<<<< HEAD
=======

store.dispatch(fetchAllSports());
>>>>>>> 767c0d00a4935d05906bf63af3b4bc91ac20eee0


export default store;