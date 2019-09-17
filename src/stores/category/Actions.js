import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  fetchCategories: null,
  // The operation has started and is loading
  fetcCategoriesLoading: null,
  // User informations were successfully fetched
  fetchCategoriesSuccess: ['categories'],
  // An error occurred
  fetchCategoriesFailure: ['errorMessage'],
});

export const CategoriesTypes = Types;
export default Creators;
