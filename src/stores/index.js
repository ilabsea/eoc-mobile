import {combineReducers} from 'redux';
import configureStore from './CreateStore';
import CategoriesReducer from './category/Reducers';
import rootSaga from '../sagas/index';

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    categories: CategoriesReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
