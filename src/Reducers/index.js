import {
  combineReducers
} from 'redux';
import {
  reducer as form
} from 'redux-form';
import productFormReducer from './productFormReducer';
import modalReducer from './modalReducer';
import productReducer from './productReducer';
import snackBarReducer from './snackBarReducer';
import projectReducer from './projectReducer';
import teamReducer from './teamReducer';
import projectFormReducer from './projectFormReducer';
import teamFormReducer from './teamFormReducer';
import userReducer from './userReducer';
import userFormReducer from './userFormReducer';

const rootReducer = combineReducers({
  modalReducer,
  form,
  productFormReducer,
  productReducer,
  snackBarReducer,
  projectReducer,
  projectFormReducer,
  teamReducer,
  teamFormReducer,
  userReducer,
  userFormReducer,
});

export default rootReducer;