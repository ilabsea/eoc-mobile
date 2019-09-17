import {INITIAL_STATE} from './InitialState';
import {createReducer} from 'reduxsauce';
import {CategoriesTypes} from './Actions';

export const fetchCategoriesLoading = state => ({
  ...state,
  categoriesIsLoading: true,
  categoriesErrorMessage: null,
});

export const fetchCategoriesSuccess = (state, {categories}) => ({
  ...state,
  categories: categories,
  categoriesIsLoading: false,
  categoriesErrorMessage: null,
});

export const fetchCategoriesFailure = (state, {errorMessage}) => ({
  ...state,
  categories: [],
  categoriesIsLoading: false,
  categoriesErrorMessage: errorMessage,
});

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [CategoriesTypes.FETCH_USER_LOADING]: fetchCategoriesLoading,
  [CategoriesTypes.FETCH_USER_SUCCESS]: fetchCategoriesSuccess,
  [CategoriesTypes.FETCH_USER_FAILURE]: fetchCategoriesFailure,
});
