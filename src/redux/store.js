import {createStore, compose} from 'redux';
import rootReducer from './reducers/rootReducer';

let composeEnhancers = compose;

if( window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})

const store = createStore(rootReducer,{}, composeEnhancers());

export default store;   