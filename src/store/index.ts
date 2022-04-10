import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import allReducers from 'reducers';

import { ActionDispatch } from 'types/store';
import ApiMiddleWare from 'middleware/ApiMiddleWare';

const createStoreWithMiddleware = applyMiddleware(thunk, ApiMiddleWare)(createStore);
const rootReducer = combineReducers(allReducers);
const store = createStoreWithMiddleware(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

const actionDispatch = (type: ActionDispatch): ActionDispatch => store.dispatch(type);

export {
  actionDispatch,
  rootReducer,
};

export default store;