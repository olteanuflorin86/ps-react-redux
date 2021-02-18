import {createStore, applyMiddleware, compose} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from './reducers';

const initialState = {};

const store = createStore(
  rootReducer, 
  initialState, 
  compose(
    applyMiddleware(reduxImmutableStateInvariant()),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;