import { createStore, combineReducers, applyMiddleware } from 'redux';
import {reducer as FormReducer} from 'redux-form';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import CategoryReducer from './CategoryReducer';
import BlackBoxReducer from './BlackBoxReducer';

const store = createStore(
  combineReducers({
    category: CategoryReducer,
    blackBox: BlackBoxReducer,
    form: FormReducer,
    routing: routerReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
